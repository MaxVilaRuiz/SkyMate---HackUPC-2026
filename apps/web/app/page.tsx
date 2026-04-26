"use client";

import { ChatInput } from "@/components/chat/ChatInput";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { useChat } from "@/hooks/useChat";
import UserMenuButton from "@/components/UserMenuButton";

export default function HomePage() {
  const { messages, isLoading, sendMessage, hasStartedConversation } = useChat();

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#EAF6FF] via-white to-[#F8FBFF] text-slate-900">

      <UserMenuButton />

      {!hasStartedConversation ? (
        <section className="flex flex-1 flex-col items-center justify-center px-4">
          <div className="w-full max-w-3xl">
            <div className="mb-10 text-center">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0770E3] text-2xl text-white shadow-lg">
                ✈
              </div>

              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#0770E3]">
                SkyMate
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
                Tell me how you want to travel
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-sm text-slate-500 md:text-base">
                Not just flights. I help you decide when, where and why to travel, based on your intent, constraints and preferences.
              </p>

              <div className="mt-8">
                <p className="text-sm font-medium text-slate-400">
                  Try asking:
                </p>

                <div className="mt-3 grid gap-2 text-sm text-slate-500">
                  <p>“I want a 5-day trip in August under €500, flexible destination.”</p>
                  <p>“Where should I travel if I want culture, food and low crowds?”</p>
                  <p>“Find me a smart weekend escape from Barcelona.”</p>
                </div>
              </div>
            </div>

            <ChatInput onSubmit={sendMessage} disabled={isLoading} />

            <p className="mt-4 text-center text-xs text-slate-400">
              AI suggestions are based on available data and reasoning. Always verify final details before booking.
            </p>
          </div>
        </section>
      ) : (
        <section className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 border-b border-sky-100 bg-white/85 px-4 py-3 backdrop-blur">
            <div className="mx-auto flex w-full max-w-3xl items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0770E3] text-white">
                ✈
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-950">
                  SkyMate
                </p>
                <p className="text-xs text-slate-500">
                  Context-aware planning & smart recommendations
                </p>
              </div>
            </div>
          </header>

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
                <MessageBubble
                  role="assistant"
                  text="Analyzing your travel intent and exploring the best options..."
                />
              )}
            </div>
          </div>

          <div className="sticky bottom-0 border-t border-sky-100 bg-white/90 px-4 py-4 backdrop-blur">
            <div className="mx-auto w-full max-w-3xl">
              <ChatInput onSubmit={sendMessage} disabled={isLoading} />

              <p className="mt-3 text-center text-xs text-slate-400">
                AI suggestions are based on available data and reasoning. Always verify final details before booking.
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}