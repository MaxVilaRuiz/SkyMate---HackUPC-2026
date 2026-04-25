"use client";

import { useState } from "react";
import { ChatInput } from "@/components/chat/ChatInput";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { sendPromptToBackend } from "@/lib/api/chat";
import { ChatMessage } from "@/lib/types/chat";

export default function HomePage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const hasStartedConversation = messages.length > 0;

  const handleSendPrompt = async (prompt: string) => {
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
        content:
          "Ha ocurrido un error al conectar con el backend. Inténtalo de nuevo.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      {!hasStartedConversation ? (
        <section className="flex flex-1 flex-col items-center justify-center px-4">
          <div className="w-full max-w-3xl">
            <div className="mb-10 text-center">
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
                ¿En qué te puedo ayudar?
              </h1>
              <p className="mt-4 text-neutral-400 text-sm md:text-base">
                Pregúntame sobre vuelos, destinos, precios o recomendaciones de
                viaje.
              </p>
            </div>

            <ChatInput onSubmit={handleSendPrompt} disabled={isLoading} />

            <p className="mt-3 text-center text-xs text-neutral-500">
              La IA puede cometer errores. Verifica siempre precios y
              disponibilidad.
            </p>
          </div>
        </section>
      ) : (
        <section className="flex flex-1 flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  role={message.role}
                  text={message.content}
                />
              ))}

              {isLoading && (
                <MessageBubble role="assistant" text="Pensando..." />
              )}
            </div>
          </div>

          <div className="sticky bottom-0 border-t border-neutral-900 bg-neutral-950/95 px-4 py-4 backdrop-blur">
            <div className="mx-auto w-full max-w-3xl">
              <ChatInput onSubmit={handleSendPrompt} disabled={isLoading} />

              <p className="mt-3 text-center text-xs text-neutral-500">
                La IA puede cometer errores. Verifica siempre precios y
                disponibilidad.
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}