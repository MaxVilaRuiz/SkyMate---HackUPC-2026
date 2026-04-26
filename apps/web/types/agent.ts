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

export type TripType = "round_trip" | "one_way";

export type TripSearchFormState = {
  originCity: string;
  destinationCity: string;
  year: string;
  month: string;
  day: string;
  tripType: TripType;
  adults: string;
  children: string;
};

export type RecommendationBaseFormState = Omit<
  TripSearchFormState,
  "destinationCity"
>;