"use client";

import { MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChatApiError, createConversation, getConversation, getMessages, sendMessage, type ChatMessage, type ConversationStatus } from "./chat-api";
import { ChatWindow } from "./chat-window";

const TOKEN_KEY = "portfolio-live-chat-token";

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
    setIsLoading(true);
    setError(undefined);

    const loadChat = async () => {
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
      setMessages((current) => [...current, message]);
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