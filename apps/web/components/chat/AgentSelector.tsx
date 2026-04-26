"use client";

import { AgentOption, AgentType } from "@/types/agent";

type AgentSelectorProps = {
  selectedAgent: AgentType;
  onChange: (agent: AgentType) => void;
};

const agentOptions: AgentOption[] = [
  {
    id: "trip_search",
    label: "Find a trip",
    icon: "✈️",
  },
  {
    id: "recommendation",
    label: "Recommend",
    icon: "✨",
  },
  {
    id: "inspiration",
    label: "Inspire me",
    icon: "🧭",
  },
];

export function AgentSelector({
  selectedAgent,
  onChange,
}: AgentSelectorProps) {
  return (
    <div className="mt-4 flex w-full flex-wrap justify-center gap-2">
      {agentOptions.map((agent) => {
        const isSelected = selectedAgent === agent.id;

        return (
          <button
            key={agent.id}
            type="button"
            onClick={() => onChange(agent.id)}
            className={`
              inline-flex items-center gap-2 rounded-full border px-4 py-2
              text-sm font-medium transition
              ${
                isSelected
                  ? "border-[#0770E3] bg-[#EAF6FF] text-[#0770E3] shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-[#0770E3]/40 hover:bg-sky-50 hover:text-[#0770E3]"
              }
            `}
          >
            <span className="text-base">{agent.icon}</span>
            <span>{agent.label}</span>
          </button>
        );
      })}
    </div>
  );
}