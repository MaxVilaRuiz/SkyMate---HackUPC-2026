import { AgentFormAnswer, SelectedAgentType } from "@/types/agent";

export type SendPromptRequest = {
  prompt: string;
  conversationId?: string;
  agentType?: SelectedAgentType;
  agentAnswers?: AgentFormAnswer[];
};

export type SendPromptResponse = {
  answer: string;
  conversationId?: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export async function sendPromptToBackend({
  prompt,
  conversationId,
  agentType,
  agentAnswers = [],
}: SendPromptRequest): Promise<SendPromptResponse> {
  const response = await fetch(`${API_BASE_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      conversation_id: conversationId,
      agent_type: agentType,
      agent_answers: agentAnswers,
    }),
  });

  if (!response.ok) {
    throw new Error("Error al enviar el mensaje al backend");
  }

  return response.json();
}