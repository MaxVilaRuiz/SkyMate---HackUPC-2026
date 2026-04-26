export type AgentType = "" | "trip_search" | "recommendation" | "inspiration";

export type AgentOption = {
  id: AgentType;
  label: string;
  icon: string;
};

export type AgentQuestion = {
    id: string;
    title: string;
    options: string[];
  };