import { AgentQuestion } from "@/types/agent";

export const AGENT_QUESTIONS = {
  recommendation: [
    {
      id: "goal",
      title: "What is the main goal of your trip?",
      options: ["Relax and disconnect", "Explore culture and food"],
    },
    {
      id: "style",
      title: "What travel style fits you best?",
      options: ["Slow and comfortable", "Active and discovery-driven"],
    },
    {
      id: "crowds",
      title: "How do you feel about crowds?",
      options: ["Avoid crowds", "I don’t mind popular places"],
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