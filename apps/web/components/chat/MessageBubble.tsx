import { ChatRole } from "@/types/chat";

type MessageBubbleProps = {
  role: ChatRole;
  text: string;
};

export function MessageBubble({ role, text }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed
          whitespace-pre-wrap shadow-sm md:max-w-[72%] md:text-base
          ${
            isUser
              ? "bg-[#0770E3] text-white rounded-br-md"
              : "bg-white text-slate-800 border border-sky-100 rounded-bl-md"
          }
        `}
      >
        {text}
      </div>
    </div>
  );
}