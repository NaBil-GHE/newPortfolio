import { Loader2, Send } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

type ChatInputProps = {
  value: string;
  disabled?: boolean;
  isSending: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
};

export function ChatInput({ value, disabled, isSending, onChange, onSend }: ChatInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <form
      className="flex items-end gap-2 border-t bg-background p-3"
      onSubmit={(event) => {
        event.preventDefault();
        onSend();
      }}
    >
      <textarea
        ref={inputRef}
        value={value}
        disabled={disabled || isSending}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            onSend();
          }
        }}
        placeholder={disabled ? "Chat unavailable" : "Write a message..."}
        aria-label="Chat message"
        rows={1}
        className="max-h-28 min-h-9 flex-1 resize-none rounded-md border bg-muted/30 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
      />
      <Button type="submit" size="icon" aria-label="Send message" disabled={disabled || isSending || !value.trim()}>
        {isSending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
      </Button>
    </form>
  );
}