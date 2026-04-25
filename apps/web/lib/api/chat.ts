export type SendPromptRequest = {
    prompt: string;
    conversationId?: string;
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
  }: SendPromptRequest): Promise<SendPromptResponse> {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        conversation_id: conversationId,
      }),
    });
  
    if (!response.ok) {
      throw new Error("Error al enviar el mensaje al backend");
    }
  
    return response.json();
  }