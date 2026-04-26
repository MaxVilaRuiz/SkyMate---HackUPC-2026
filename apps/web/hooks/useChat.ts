"use client";

import { useState } from "react";
import { sendPromptToBackend } from "@/lib/api/chat";
import { ChatMessage } from "@/types/chat";
import { AgentFormAnswer, SelectedAgentType } from "@/types/agent";

type SendMessageParams = {
  prompt: string;
  agentType: SelectedAgentType;
  agentAnswers: AgentFormAnswer[];
};

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async ({
    prompt,
    agentType,
    agentAnswers,
  }: SendMessageParams) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const data = await sendPromptToBackend({
        prompt,
        conversationId,
        agentType,
        agentAnswers: agentType ? agentAnswers : [],
      });

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.answer,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (data.conversationId) {
        setConversationId(data.conversationId);
      }
    } catch {
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Error al conectar con el backend",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
    hasStartedConversation: messages.length > 0,
  };
}