export type AgentType = "" | "trip_search" | "recommendation" | "inspiration";

export type AgentOption = {
  id: AgentType;
  label: string;
  icon: string;
};