import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DisclaimerStep } from "@/components/check/DisclaimerStep";
import { SymptomsStep } from "@/components/check/SymptomsStep";
import { FollowUpStep } from "@/components/check/FollowUpStep";
import { ResultsStep } from "@/components/check/ResultsStep";
import type { AssessmentState, FollowUpQuestion, SymptomEntry, TriageResult } from "@/types/triage";
import { generateFollowUpQuestions, calculateTriageResult } from "@/lib/triage-logic";

const initialState: AssessmentState = {
  step: "disclaimer",
  currentFollowUpIndex: 0,
  symptomEntry: {
    symptoms: [],
    freeText: "",
  },
  followUpAnswers: {},
  result: null,
};

export default function Check() {
  const [state, setState] = useState<AssessmentState>(initialState);
  const [followUpQuestions, setFollowUpQuestions] = useState<FollowUpQuestion[]>([]);

  const handleDisclaimerAccept = () => {
    setState((prev) => ({ ...prev, step: "symptoms" }));
  };

  const handleSymptomsNext = (data: SymptomEntry) => {
    const questions = generateFollowUpQuestions(data);
    setFollowUpQuestions(questions);
    setState((prev) => ({
      ...prev,
      symptomEntry: data,
      step: "followup",
      currentFollowUpIndex: 0,
    }));
  };

  const handleFollowUpAnswer = (answer: string | number | boolean) => {
    const currentQuestion = followUpQuestions[state.currentFollowUpIndex];
    const updatedAnswers = {
      ...state.followUpAnswers,
      [currentQuestion.id]: answer,
    };

    if (state.currentFollowUpIndex >= followUpQuestions.length - 1) {
      // Calculate result
      const result = calculateTriageResult(state.symptomEntry, updatedAnswers);
      setState((prev) => ({
        ...prev,
        followUpAnswers: updatedAnswers,
        result,
        step: "results",
      }));
    } else {
      setState((prev) => ({
        ...prev,
        followUpAnswers: updatedAnswers,
        currentFollowUpIndex: prev.currentFollowUpIndex + 1,
      }));
    }
  };

  const handleFollowUpBack = () => {
    if (state.currentFollowUpIndex === 0) {
      setState((prev) => ({ ...prev, step: "symptoms" }));
    } else {
      setState((prev) => ({
        ...prev,
        currentFollowUpIndex: prev.currentFollowUpIndex - 1,
      }));
    }
  };

  const handleStartOver = () => {
    setState(initialState);
    setFollowUpQuestions([]);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          {state.step === "disclaimer" && (
            <DisclaimerStep onAccept={handleDisclaimerAccept} />
          )}

          {state.step === "symptoms" && (
            <SymptomsStep
              initialData={state.symptomEntry}
              onNext={handleSymptomsNext}
            />
          )}

          {state.step === "followup" && followUpQuestions.length > 0 && (
            <FollowUpStep
              question={followUpQuestions[state.currentFollowUpIndex]}
              currentIndex={state.currentFollowUpIndex}
              totalQuestions={followUpQuestions.length}
              previousAnswer={state.followUpAnswers[followUpQuestions[state.currentFollowUpIndex].id]}
              onAnswer={handleFollowUpAnswer}
              onBack={handleFollowUpBack}
            />
          )}

          {state.step === "results" && state.result && (
            <ResultsStep result={state.result} onStartOver={handleStartOver} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
