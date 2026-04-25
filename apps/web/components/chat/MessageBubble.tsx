import { ChatRole } from "@/lib/types/chat";

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
          max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 
          text-sm md:text-base leading-relaxed whitespace-pre-wrap
          ${
            isUser
              ? "bg-white text-black"
              : "bg-neutral-800 text-neutral-100 border border-neutral-700"
          }
        `}
      >
        {text}
      </div>
    </div>
  );
}