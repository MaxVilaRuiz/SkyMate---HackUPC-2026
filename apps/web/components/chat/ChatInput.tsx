"use client";

import { useState } from "react";

type ChatInputProps = {
  onSubmit: (prompt: string) => void | Promise<void>;
  disabled?: boolean;
};

export function ChatInput({ onSubmit, disabled = false }: ChatInputProps) {
  const [prompt, setPrompt] = useState("");

  const cleanPrompt = prompt.trim();
  const isSubmitDisabled = disabled || cleanPrompt.length === 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitDisabled) return;

    await onSubmit(cleanPrompt);
    setPrompt("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="w-full rounded-3xl border border-neutral-800 bg-neutral-900 shadow-lg"
    >
      <div className="flex items-end gap-3 p-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Escribe tu mensaje..."
          rows={1}
          disabled={disabled}
          autoComplete="off"
          spellCheck={false}
          className="max-h-40 min-h-12 flex-1 resize-none bg-transparent px-3 py-3 text-sm md:text-base outline-none placeholder:text-neutral-500 disabled:opacity-60"
        />

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-500"
          aria-label="Enviar mensaje"
        >
          ↑
        </button>
      </div>
    </form>
  );
}