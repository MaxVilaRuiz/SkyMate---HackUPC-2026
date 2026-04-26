import { AgentQuestion } from "@/types/agent";

export const AGENT_QUESTIONS = {
    recommendation: [
        {
            id: "environment",
            title: "What environment sounds better?",
            options: ["Beach and sea", "Mountains and nature"],
        },
        {
            id: "place_type",
            title: "What kind of place do you prefer?",
            options: ["City energy", "Rural calm"],
        },
        {
            id: "climate",
            title: "What climate fits your mood?",
            options: ["Warm and sunny", "Cold and cozy"],
        },
        {
            id: "budget_style",
            title: "How should we think about budget?",
            options: ["Low budget", "Premium comfort"],
        },
    ],

  inspiration: [
    {
      id: "mood",
      title: "What kind of feeling are you looking for?",
      options: ["Calm and beautiful", "Unexpected and exciting"],
    },
    {
      id: "vibe",
      title: "What kind of place attracts you more?",
      options: ["Hidden nature", "Lively local culture"],
    },
    {
      id: "surprise",
      title: "How adventurous should the suggestion be?",
      options: ["Safe but original", "Surprise me completely"],
    },
  ],
} satisfies Record<"recommendation" | "inspiration", AgentQuestion[]>;