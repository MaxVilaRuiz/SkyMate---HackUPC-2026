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

export type AgentFormAnswer = {
    questionId: string;
    question: string;
    answer: string;
};