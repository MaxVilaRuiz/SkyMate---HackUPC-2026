"use client";

import { useState } from "react";
import { AGENT_QUESTIONS } from "@/config/agentQuestions";
import { AgentType } from "@/types/agent";

type AgentPreferenceFormProps = {
  agentType: AgentType;
  onClose: () => void;
  onComplete: (answers: string[]) => void;
};

export function AgentPreferenceForm({
  agentType,
  onClose,
  onComplete,
}: AgentPreferenceFormProps) {
  const questions = AGENT_QUESTIONS[agentType];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    const nextAnswers = [...answers, answer];

    if (currentQuestionIndex < questions.length - 1) {
      setAnswers(nextAnswers);
      setCurrentQuestionIndex((prev) => prev + 1);
      return;
    }

    onComplete(nextAnswers);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#0770E3]">
          Step {currentQuestionIndex + 1} of {questions.length}
        </p>

        <h2 className="mb-8 text-center text-2xl font-bold text-slate-800">
          {currentQuestion.title}
        </h2>

        <div className="mb-10 flex flex-col gap-3 sm:flex-row">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="flex-1 rounded-2xl border-2 border-sky-100 bg-sky-50 p-5 text-center font-semibold text-sky-700 transition-all hover:scale-[1.02] hover:border-[#0770E3]"
            >
              {option}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full text-center text-xs font-semibold text-red-400"
        >
          Close
        </button>
      </div>
    </div>
  );
}