"use client";

import { TripSearchForm } from "./TripSearchForm";
import { RecommendationForm } from "./RecommendationForm";
import { QuestionFlowForm } from "./QuestionFlowForm";
import { AgentFormAnswer, AgentType } from "@/types/agent";

type AgentPreferenceFormProps = {
  agentType: AgentType;
  onClose: () => void;
  onComplete: (answers: AgentFormAnswer[]) => void;
};

export function AgentPreferenceForm({
  agentType,
  onClose,
  onComplete,
}: AgentPreferenceFormProps) {
  if (agentType === "trip_search") {
    return <TripSearchForm onClose={onClose} onComplete={onComplete} />;
  }

  if (agentType === "recommendation") {
    return <RecommendationForm onClose={onClose} onComplete={onComplete} />;
  }

  return (
    <QuestionFlowForm
      agentType="inspiration"
      onClose={onClose}
      onComplete={onComplete}
    />
  );
}