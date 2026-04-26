export type AgentType = "trip_search" | "recommendation" | "inspiration";

export type SelectedAgentType = AgentType | null;

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