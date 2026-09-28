"use client";

import { MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { ChatApiError, createConversation, getConversation, getMessages, normalizeMessage, sendMessage, type ChatMessage, type ConversationStatus } from "./chat-api";
import { ChatWindow } from "./chat-window";

const TOKEN_KEY = "portfolio-live-chat-token";
const isRealtimeDiagnosticsEnabled = process.env.NODE_ENV !== "production";

const logRealtime = (event: string, details: Record<string, unknown> = {}) => {
  if (isRealtimeDiagnosticsEnabled) console.debug(`[LiveChat] ${event}`, details);
};

const getErrorMessage = (error: unknown) => {
  if (!(error instanceof ChatApiError)) return "Chat is temporarily unavailable. Please try again later.";
  if (error.code === "CONFIGURATION_ERROR" || error.code === "NETWORK_ERROR" || error.status === 0) return "Chat is temporarily unavailable. Please try again later.";
  if (error.status === 404) return "This conversation could not be found.";
  if (error.status === 409 || error.status === 410) return "This conversation is no longer available.";
  return "Something went wrong while loading chat. Please try again.";
};

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState<string>();
  const [status, setStatus] = useState<ConversationStatus>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousToken = window.sessionStorage.getItem(TOKEN_KEY);
    let cancelled = false;

    const loadChat = async () => {
      setIsLoading(true);
      setError(undefined);
      try {
        const conversation = previousToken ? await getConversation(previousToken) : await createConversation();
        if (cancelled) return;
        window.sessionStorage.setItem(TOKEN_KEY, conversation.publicToken);
        setToken(conversation.publicToken);
        setStatus(conversation.status);
        const history = await getMessages(conversation.publicToken);
        if (!cancelled) setMessages(history);
      } catch (loadError) {
        if (!cancelled) setError(getErrorMessage(loadError));
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void loadChat();
    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    if (!isOpen || !token || isLoading || !apiUrl || status === "CLOSED" || status === "EXPIRED") return;

    const socket = io(apiUrl, {
      autoConnect: false,
      reconnection: true,
      withCredentials: true,
    });
    const handleMessage = (payload: unknown) => {
      const message = normalizeMessage(payload);
      logRealtime("message:new received", { messageId: message.id, publicToken: token });
      if (!message.content || !message.id) return;
      setMessages((current) =>
        current.some((existing) => existing.id === message.id) ? current : [...current, message]
      );
    };

    const handleConnect = () => {
      logRealtime("socket connected", { publicToken: token });
      logRealtime("join requested", { publicToken: token });
      socket.emit("conversation:join", token, (acknowledgement: unknown) => {
        const ackRecord = acknowledgement && typeof acknowledgement === "object"
          ? acknowledgement as Record<string, unknown>
          : undefined;
        logRealtime("join acknowledgement status", {
          publicToken: token,
          status: typeof acknowledgement === "string"
            ? acknowledgement
            : ackRecord && typeof ackRecord.status === "string"
              ? ackRecord.status
              : acknowledgement === undefined
                ? "received without status"
                : "received",
        });
      });
    };
    const handleDisconnect = () => logRealtime("socket disconnected", { publicToken: token });

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("message:new", handleMessage);
    socket.connect();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("message:new", handleMessage);
      socket.disconnect();
    };
  }, [isOpen, isLoading, status, token]);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const handleSend = async () => {
    const content = draft.trim();
    if (!content || !token || isSending || status === "CLOSED" || status === "EXPIRED") return;
    setIsSending(true);
    setError(undefined);
    try {
      const message = await sendMessage(token, content);
      setMessages((current) =>
        current.some((existing) => existing.id === message.id) ? current : [...current, message]
      );
      setDraft("");
    } catch (sendError) {
      if (sendError instanceof ChatApiError && (sendError.status === 409 || sendError.status === 410)) {
        setStatus(sendError.status === 410 ? "EXPIRED" : "CLOSED");
      }
      setError(getErrorMessage(sendError));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {isOpen && (
        <ChatWindow messages={messages} draft={draft} status={status} error={error} isLoading={isLoading} isSending={isSending} onDraftChange={setDraft} onSend={handleSend} onClose={() => setIsOpen(false)} />
      )}
      <Button type="button" size="icon" className="fixed bottom-20 right-4 z-40 size-12 shadow-lg sm:bottom-6 sm:right-6" onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? "Close live chat" : "Open live chat"} aria-expanded={isOpen}>
        {isOpen ? <X className="size-5" /> : <MessageCircle className="size-5" />}
      </Button>
    </>
  );
}