export type ChatAuthor = "GUEST" | "ADMIN" | "SYSTEM" | "guest" | "admin" | "system";

export type ChatMessage = {
  id: string;
  content: string;
  author: ChatAuthor;
  createdAt?: string;
};

export type ConversationStatus = "OPEN" | "CLOSED" | "EXPIRED" | string;

export type Conversation = {
  publicToken: string;
  status: ConversationStatus;
};

type ApiRecord = Record<string, unknown>;

export class ChatApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ChatApiError";
    this.status = status;
    this.code = code;
  }
}

const getApiUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (!apiUrl) {
    throw new ChatApiError("Chat service is not configured.", 0, "CONFIGURATION_ERROR");
  }
  return apiUrl;
};

const getRecord = (value: unknown): ApiRecord =>
  value && typeof value === "object" ? (value as ApiRecord) : {};

const getPayload = (value: unknown): ApiRecord => {
  const record = getRecord(value);
  return getRecord(record.data ?? record.conversation ?? record.message ?? value);
};

const getString = (record: ApiRecord, ...keys: string[]) => {
  for (const key of keys) {
    if (typeof record[key] === "string") return record[key] as string;
  }
  return undefined;
};

const parseResponse = async (response: Response) => {
  const text = await response.text();
  let body: unknown = undefined;
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = undefined;
    }
  }

  if (!response.ok) {
    const record = getRecord(body);
    throw new ChatApiError(
      getString(record, "message", "error") || "Chat request failed.",
      response.status,
      getString(record, "code")
    );
  }

  return body;
};

const request = async (path: string, init?: RequestInit) => {
  try {
    const response = await fetch(`${getApiUrl()}${path}`, {
      ...init,
      credentials: "include",
      headers: {
        ...(init?.body ? { "Content-Type": "application/json" } : {}),
        ...init?.headers,
      },
    });
    return parseResponse(response);
  } catch (error) {
    if (error instanceof ChatApiError) throw error;
    throw new ChatApiError("Unable to reach the chat service.", 0, "NETWORK_ERROR");
  }
};

const normalizeConversation = (value: unknown): Conversation => {
  const record = getPayload(value);
  const publicToken = getString(record, "publicToken", "public_token", "token");
  if (!publicToken) throw new ChatApiError("Conversation information is incomplete.", 200);
  return {
    publicToken,
    status: getString(record, "status")?.toUpperCase() || "OPEN",
  };
};

export const normalizeMessage = (value: unknown, index = 0): ChatMessage => {
  const record = getPayload(value);
  const content = getString(record, "content", "text", "body") || "";
  const author = getString(record, "author", "role", "sender", "senderType") || "SYSTEM";
  return {
    id: getString(record, "id", "messageId", "message_id") || `${index}-${content}`,
    content,
    author: author.toUpperCase() as ChatAuthor,
    createdAt: getString(record, "createdAt", "created_at", "timestamp"),
  };
};

export async function createConversation() {
  return normalizeConversation(
    await request("/api/support/conversations", { method: "POST" })
  );
}

export async function getConversation(publicToken: string) {
  return normalizeConversation(
    await request(`/api/support/conversations/${encodeURIComponent(publicToken)}`)
  );
}

export async function getMessages(publicToken: string) {
  const body = await request(
    `/api/support/conversations/${encodeURIComponent(publicToken)}/messages`
  );
  const record = getRecord(body);
  const messages = Array.isArray(record.messages)
    ? record.messages
    : Array.isArray(record.data)
      ? record.data
      : Array.isArray(body)
        ? body
        : [];
  return messages.map(normalizeMessage).filter((message) => message.content);
}

export async function sendMessage(publicToken: string, content: string) {
  return normalizeMessage(
    await request(
      `/api/support/conversations/${encodeURIComponent(publicToken)}/messages`,
      { method: "POST", body: JSON.stringify({ content }) }
    )
  );
}