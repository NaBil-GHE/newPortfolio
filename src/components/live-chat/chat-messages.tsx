import type { ChatMessage } from "./chat-api";

type ChatMessagesProps = {
  messages: ChatMessage[];
  isLoading: boolean;
};

const getAuthorLabel = (author: ChatMessage["author"]) => {
  const normalized = author.toUpperCase();
  if (normalized === "ADMIN") return "Nabil";
  if (normalized === "SYSTEM") return "System";
  return "You";
};

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  if (isLoading) {
    return <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">Loading messages...</div>;
  }

  if (!messages.length) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <p className="text-sm font-medium">Start a conversation</p>
        <p className="mt-1 text-xs text-muted-foreground">Send a message and I&apos;ll get back to you.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4" aria-live="polite">
      {messages.map((message) => {
        const author = message.author.toUpperCase();
        const isGuest = author === "GUEST";
        const isSystem = author === "SYSTEM";
        return (
          <div key={message.id} className={isGuest ? "flex justify-end" : "flex justify-start"}>
            <div
              className={isSystem
                ? "max-w-[90%] rounded-md border border-dashed bg-muted/50 px-3 py-2 text-xs text-muted-foreground"
                : isGuest
                  ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground"
                  : "max-w-[85%] rounded-2xl rounded-bl-sm border bg-card px-3 py-2 text-sm"}
            >
              {!isGuest && <p className="mb-1 text-[11px] font-medium text-muted-foreground">{getAuthorLabel(message.author)}</p>}
              <p className="whitespace-pre-wrap wrap-break-word">{message.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}