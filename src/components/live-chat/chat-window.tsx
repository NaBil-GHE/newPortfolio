import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ChatMessage, ConversationStatus } from "./chat-api";
import { ChatInput } from "./chat-input";
import { ChatMessages } from "./chat-messages";

type ChatWindowProps = {
  messages: ChatMessage[];
  draft: string;
  status?: ConversationStatus;
  error?: string;
  isLoading: boolean;
  isSending: boolean;
  onDraftChange: (value: string) => void;
  onSend: () => void;
  onClose: () => void;
};

export function ChatWindow({ messages, draft, status, error, isLoading, isSending, onDraftChange, onSend, onClose }: ChatWindowProps) {
  const isClosed = status === "CLOSED" || status === "EXPIRED";
  const statusMessage = status === "EXPIRED" ? "This conversation has expired." : "This conversation is closed.";

  return (
    <section className="fixed inset-x-3 bottom-20 z-40 flex h-[min(580px,calc(100dvh-6rem))] flex-col overflow-hidden rounded-xl border bg-background/95 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:bottom-24 sm:right-6 sm:w-95" aria-label="Live chat">
      <header className="flex items-center justify-between border-b px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold">Live chat</h2>
          <p className="text-xs text-muted-foreground">Usually replies within a day</p>
        </div>
        <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close chat">
          <X className="size-4" />
        </Button>
      </header>
      {error && <p className="border-b bg-destructive/10 px-4 py-2 text-xs text-destructive">{error}</p>}
      <ChatMessages messages={messages} isLoading={isLoading} />
      {isClosed && <p className="border-t bg-muted/50 px-4 py-3 text-center text-xs text-muted-foreground">{statusMessage}</p>}
      <ChatInput value={draft} disabled={isClosed || Boolean(error && !status)} isSending={isSending} onChange={onDraftChange} onSend={onSend} />
    </section>
  );
}