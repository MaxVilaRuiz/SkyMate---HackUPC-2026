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
          id: "trip_feeling",
          title: "What should this trip make you feel?",
          options: ["Inspired and curious", "Calm and disconnected"],
        },
        {
          id: "environment",
          title: "What kind of place pulls you in?",
          options: ["Culture, food & museums", "Nature, silence & landscapes"],
        },
        {
          id: "landscape",
          title: "Where would you rather wake up?",
          options: ["Near the sea", "Surrounded by mountains"],
        },
        {
          id: "pace",
          title: "What pace sounds better?",
          options: ["Walkable city days", "Slow rural mornings"],
        },
        {
          id: "climate",
          title: "What climate matches your mood?",
          options: ["Warm, bright and sunny", "Cold, cozy and atmospheric"],
        },
        {
          id: "budget_style",
          title: "How should the trip feel financially?",
          options: ["Smart and low-cost", "Premium and effortless"],
        },
        {
          id: "surprise_level",
          title: "How far from the obvious should I go?",
          options: ["Slightly unexpected", "Completely surprise me"],
        },
    ],
} satisfies Record<"recommendation" | "inspiration", AgentQuestion[]>;