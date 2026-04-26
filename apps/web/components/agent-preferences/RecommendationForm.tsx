"use client";

import { useState } from "react";
import { FormModal } from "./FormModal";
import { QuestionFlowForm } from "./QuestionFlowForm";
import { TextField } from "./fields/TextField";
import { NumberField } from "./fields/NumberField";
import { TripTypeSelector } from "./fields/TripTypeSelector";
import {
  AgentFormAnswer,
  RecommendationBaseFormState,
} from "@/types/agent";
import { buildRecommendationBaseAnswers } from "@/utils/agentAnswers";

const initialRecommendationBaseForm: RecommendationBaseFormState = {
  originCity: "",
  year: "",
  month: "",
  day: "",
  tripType: "round_trip",
  adults: "1",
  children: "0",
};

type Props = {
  onClose: () => void;
  onComplete: (answers: AgentFormAnswer[]) => void;
};

export function RecommendationForm({ onClose, onComplete }: Props) {
  const [step, setStep] = useState<"base" | "quiz">("base");
  const [form, setForm] = useState<RecommendationBaseFormState>(
    initialRecommendationBaseForm
  );
  const [baseAnswers, setBaseAnswers] = useState<AgentFormAnswer[]>([]);

  const isValid =
    form.originCity.trim().length > 0 &&
    form.year.trim().length > 0 &&
    form.month.trim().length > 0 &&
    Number(form.adults) > 0 &&
    Number(form.children) >= 0;

  const updateField = <K extends keyof RecommendationBaseFormState>(
    field: K,
    value: RecommendationBaseFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (!isValid) return;

    setBaseAnswers(buildRecommendationBaseAnswers(form));
    setStep("quiz");
  };

  if (step === "quiz") {
    return (
      <QuestionFlowForm
        agentType="recommendation"
        onClose={onClose}
        onComplete={onComplete}
        initialAnswers={baseAnswers}
      />
    );
  }

  return (
    <FormModal
      eyebrow="Recommend a destination"
      title="Tell me your travel context"
      description="I’ll use this to recommend destinations that fit your intent."
      footer={
        <>
          <button
            onClick={onClose}
            className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-500 hover:bg-slate-50"
          >
            Close
          </button>

          <button
            onClick={handleNext}
            disabled={!isValid}
            className="flex-1 rounded-2xl bg-[#0770E3] px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          >
            Next
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <TextField
          label="From city"
          required
          value={form.originCity}
          placeholder="Barcelona"
          onChange={(value) => updateField("originCity", value)}
        />

        <div className="grid grid-cols-3 gap-3">
          <NumberField
            label="Year"
            required
            value={form.year}
            placeholder="2026"
            min={2026}
            onChange={(value) => updateField("year", value)}
          />

          <NumberField
            label="Month"
            required
            value={form.month}
            placeholder="08"
            min={1}
            max={12}
            onChange={(value) => updateField("month", value)}
          />

          <NumberField
            label="Day"
            value={form.day}
            placeholder="15"
            min={1}
            max={31}
            onChange={(value) => updateField("day", value)}
          />
        </div>

        <TripTypeSelector
          value={form.tripType}
          onChange={(value) => updateField("tripType", value)}
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField
            label="Adults"
            required
            value={form.adults}
            min={1}
            onChange={(value) => updateField("adults", value)}
          />

          <NumberField
            label="Children"
            required
            value={form.children}
            min={0}
            onChange={(value) => updateField("children", value)}
          />
        </div>
      </div>
    </FormModal>
  );
}