import {
    AgentFormAnswer,
    RecommendationBaseFormState,
    TripSearchFormState,
  } from "@/types/agent";
  
  const tripTypeLabel = (tripType: "round_trip" | "one_way") =>
    tripType === "round_trip" ? "Round trip" : "One way";
  
  export function buildTripSearchAnswers(
    form: TripSearchFormState
  ): AgentFormAnswer[] {
    return [
      { questionId: "origin_city", question: "Origin city", answer: form.originCity },
      { questionId: "destination_city", question: "Destination city", answer: form.destinationCity },
      { questionId: "travel_year", question: "Travel year", answer: form.year },
      { questionId: "travel_month", question: "Travel month", answer: form.month },
      { questionId: "travel_day", question: "Travel day", answer: form.day || "Flexible / not specified" },
      { questionId: "trip_type", question: "Trip type", answer: tripTypeLabel(form.tripType) },
      { questionId: "adults", question: "Number of adults", answer: form.adults },
      { questionId: "children", question: "Number of children", answer: form.children },
    ];
  }
  
  export function buildRecommendationBaseAnswers(
    form: RecommendationBaseFormState
  ): AgentFormAnswer[] {
    return [
      { questionId: "origin_city", question: "Origin city", answer: form.originCity },
      { questionId: "travel_year", question: "Travel year", answer: form.year },
      { questionId: "travel_month", question: "Travel month", answer: form.month },
      { questionId: "travel_day", question: "Travel day", answer: form.day || "Flexible / not specified" },
      { questionId: "trip_type", question: "Trip type", answer: tripTypeLabel(form.tripType) },
      { questionId: "adults", question: "Number of adults", answer: form.adults },
      { questionId: "children", question: "Number of children", answer: form.children },
    ];
  }