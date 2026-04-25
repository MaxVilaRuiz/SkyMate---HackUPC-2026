"use client";

import { useState } from "react";

type UseChatInputParams = {
  onSubmit: (prompt: string) => void | Promise<void>;
  disabled?: boolean;
};

export function useChatInput({
  onSubmit,
  disabled = false,
}: UseChatInputParams) {
  const [prompt, setPrompt] = useState("");

  const cleanPrompt = prompt.trim();
  const isSubmitDisabled = disabled || cleanPrompt.length === 0;

  const submitPrompt = async () => {
    if (isSubmitDisabled) return;

    await onSubmit(cleanPrompt);
    setPrompt("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitPrompt();
  };

  const handleKeyDown = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await submitPrompt();
    }
  };

  return {
    prompt,
    setPrompt,
    isSubmitDisabled,
    handleSubmit,
    handleKeyDown,
  };
}