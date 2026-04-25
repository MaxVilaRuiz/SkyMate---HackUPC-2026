"use client";

// import { useState } from "react";
import { ChatInput } from "@/components/chat/ChatInput";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { useChat } from "@/hooks/useChat";

export default function HomePage() {
  const { messages, isLoading, sendMessage, hasStartedConversation } = useChat();

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

            <ChatInput onSubmit={sendMessage} disabled={isLoading} />

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
              <ChatInput onSubmit={sendMessage} disabled={isLoading} />

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