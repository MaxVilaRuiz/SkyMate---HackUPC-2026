"use client";

import { useState } from "react";
import { AGENT_QUESTIONS } from "@/config/agentQuestions";
import { AgentFormAnswer, AgentType } from "@/types/agent";

type AgentPreferenceFormProps = {
  agentType: AgentType;
  onClose: () => void;
  onComplete: (answers: AgentFormAnswer[]) => void;
};

type TripSearchFormState = {
  originCity: string;
  destinationCity: string;
  year: string;
  month: string;
  day: string;
  tripType: "round_trip" | "one_way";
  adults: string;
  children: string;
};

const initialTripSearchForm: TripSearchFormState = {
  originCity: "",
  destinationCity: "",
  year: "",
  month: "",
  day: "",
  tripType: "round_trip",
  adults: "1",
  children: "0",
};

export function AgentPreferenceForm({
  agentType,
  onClose,
  onComplete,
}: AgentPreferenceFormProps) {
  if (agentType === "trip_search") {
    return (
      <TripSearchForm
        onClose={onClose}
        onComplete={onComplete}
      />
    );
  }

  return (
    <QuestionFlowForm
      agentType={agentType}
      onClose={onClose}
      onComplete={onComplete}
    />
  );
}

function TripSearchForm({
  onClose,
  onComplete,
}: {
  onClose: () => void;
  onComplete: (answers: AgentFormAnswer[]) => void;
}) {
  const [form, setForm] = useState<TripSearchFormState>(
    initialTripSearchForm
  );

  const isValid =
    form.originCity.trim().length > 0 &&
    form.destinationCity.trim().length > 0 &&
    form.year.trim().length > 0 &&
    form.month.trim().length > 0 &&
    Number(form.adults) > 0 &&
    Number(form.children) >= 0;

  const updateField = <K extends keyof TripSearchFormState>(
    field: K,
    value: TripSearchFormState[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!isValid) return;

    const answers: AgentFormAnswer[] = [
      {
        questionId: "origin_city",
        question: "Origin city",
        answer: form.originCity,
      },
      {
        questionId: "destination_city",
        question: "Destination city",
        answer: form.destinationCity,
      },
      {
        questionId: "travel_year",
        question: "Travel year",
        answer: form.year,
      },
      {
        questionId: "travel_month",
        question: "Travel month",
        answer: form.month,
      },
      {
        questionId: "travel_day",
        question: "Travel day",
        answer: form.day || "Flexible / not specified",
      },
      {
        questionId: "trip_type",
        question: "Trip type",
        answer: form.tripType === "round_trip" ? "Round trip" : "One way",
      },
      {
        questionId: "adults",
        question: "Number of adults",
        answer: form.adults,
      },
      {
        questionId: "children",
        question: "Number of children",
        answer: form.children,
      },
    ];

    onComplete(answers);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl md:p-8">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#0770E3]">
          Find a trip
        </p>

        <h2 className="mb-2 text-center text-2xl font-bold text-slate-800">
          Tell me the basics
        </h2>

        <p className="mb-6 text-center text-sm text-slate-500">
          Year and month are required. Day can stay flexible.
        </p>

        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1">
              <span className="text-xs font-semibold text-slate-500">
                From city *
              </span>
              <input
                value={form.originCity}
                onChange={(e) => updateField("originCity", e.target.value)}
                placeholder="Barcelona"
                className="w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm outline-none focus:border-[#0770E3]"
              />
            </label>

            <label className="space-y-1">
              <span className="text-xs font-semibold text-slate-500">
                To city *
              </span>
              <input
                value={form.destinationCity}
                onChange={(e) =>
                  updateField("destinationCity", e.target.value)
                }
                placeholder="New York"
                className="w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm outline-none focus:border-[#0770E3]"
              />
            </label>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <label className="space-y-1">
              <span className="text-xs font-semibold text-slate-500">
                Year *
              </span>
              <input
                type="number"
                value={form.year}
                onChange={(e) => updateField("year", e.target.value)}
                placeholder="2026"
                min="2026"
                className="w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm outline-none focus:border-[#0770E3]"
              />
            </label>

            <label className="space-y-1">
              <span className="text-xs font-semibold text-slate-500">
                Month *
              </span>
              <input
                type="number"
                value={form.month}
                onChange={(e) => updateField("month", e.target.value)}
                placeholder="08"
                min="1"
                max="12"
                className="w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm outline-none focus:border-[#0770E3]"
              />
            </label>

            <label className="space-y-1">
              <span className="text-xs font-semibold text-slate-500">
                Day
              </span>
              <input
                type="number"
                value={form.day}
                onChange={(e) => updateField("day", e.target.value)}
                placeholder="15"
                min="1"
                max="31"
                className="w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm outline-none focus:border-[#0770E3]"
              />
            </label>
          </div>

          <div>
            <span className="mb-2 block text-xs font-semibold text-slate-500">
              Trip type
            </span>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => updateField("tripType", "round_trip")}
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                  form.tripType === "round_trip"
                    ? "border-[#0770E3] bg-[#EAF6FF] text-[#0770E3]"
                    : "border-sky-100 bg-sky-50 text-slate-600"
                }`}
              >
                Round trip
              </button>

              <button
                type="button"
                onClick={() => updateField("tripType", "one_way")}
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                  form.tripType === "one_way"
                    ? "border-[#0770E3] bg-[#EAF6FF] text-[#0770E3]"
                    : "border-sky-100 bg-sky-50 text-slate-600"
                }`}
              >
                One way
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1">
              <span className="text-xs font-semibold text-slate-500">
                Adults
              </span>
              <input
                type="number"
                value={form.adults}
                onChange={(e) => updateField("adults", e.target.value)}
                min="1"
                className="w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm outline-none focus:border-[#0770E3]"
              />
            </label>

            <label className="space-y-1">
              <span className="text-xs font-semibold text-slate-500">
                Children
              </span>
              <input
                type="number"
                value={form.children}
                onChange={(e) => updateField("children", e.target.value)}
                min="0"
                className="w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm outline-none focus:border-[#0770E3]"
              />
            </label>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-500 hover:bg-slate-50"
          >
            Close
          </button>

          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="flex-1 rounded-2xl bg-[#0770E3] px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          >
            Save preferences
          </button>
        </div>
      </div>
    </div>
  );
}

function QuestionFlowForm({
  agentType,
  onClose,
  onComplete,
}: {
  agentType: "recommendation" | "inspiration";
  onClose: () => void;
  onComplete: (answers: AgentFormAnswer[]) => void;
}) {
  const questions = AGENT_QUESTIONS[agentType];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AgentFormAnswer[]>([]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    const nextAnswer: AgentFormAnswer = {
      questionId: currentQuestion.id,
      question: currentQuestion.title,
      answer,
    };

    const nextAnswers = [...answers, nextAnswer];

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