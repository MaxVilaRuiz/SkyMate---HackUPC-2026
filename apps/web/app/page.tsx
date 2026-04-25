"use client";

import { useState } from "react";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    setMessages((prev) => [...prev, prompt]);
    setPrompt("");
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      <section className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-3xl flex flex-col items-center">
          {messages.length === 0 ? (
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
                ¿En qué te puedo ayudar?
              </h1>
              <p className="mt-4 text-neutral-400 text-sm md:text-base">
                Pregúntame sobre vuelos, destinos, precios o recomendaciones de viaje.
              </p>
            </div>
          ) : (
            <div className="w-full mb-8 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className="ml-auto max-w-[85%] md:max-w-[70%] rounded-2xl bg-neutral-800 px-4 py-3 text-sm md:text-base"
                >
                  {message}
                </div>
              ))}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="w-full rounded-3xl border border-neutral-800 bg-neutral-900 shadow-lg"
          >
            <div className="flex items-end gap-3 p-3">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Escribe tu mensaje..."
                rows={1}
                className="max-h-40 min-h-12 flex-1 resize-none bg-transparent px-3 py-3 text-sm md:text-base outline-none placeholder:text-neutral-500"
              />

              <button
                type="submit"
                disabled={!prompt.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-500"
                aria-label="Enviar mensaje"
              >
                ↑
              </button>
            </div>
          </form>

          <p className="mt-3 text-xs text-neutral-500 text-center">
            La IA puede cometer errores. Verifica siempre precios y disponibilidad.
          </p>
        </div>
      </section>
    </main>
  );
}