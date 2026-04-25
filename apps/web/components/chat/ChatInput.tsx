"use client";

import { useChatInput } from "@/hooks/useChatInput";

type ChatInputProps = {
  onSubmit: (prompt: string) => void | Promise<void>;
  disabled?: boolean;
};

export function ChatInput({ onSubmit, disabled = false }: ChatInputProps) {
  const {
    prompt,
    setPrompt,
    isSubmitDisabled,
    handleSubmit,
    handleKeyDown,
  } = useChatInput({ onSubmit, disabled });

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="w-full rounded-[28px] border border-sky-100 bg-white shadow-[0_12px_40px_rgba(7,112,227,0.14)]"
    >
      <div className="flex items-end gap-3 p-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything you want about travel..."
          rows={1}
          disabled={disabled}
          autoComplete="off"
          spellCheck={false}
          className="max-h-40 min-h-12 flex-1 resize-none bg-transparent px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:opacity-60 md:text-base"
        />

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0770E3] text-white shadow-md transition hover:bg-[#065EC0] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          aria-label="Send message"
        >
          ↑
        </button>
      </div>
    </form>
  );
}