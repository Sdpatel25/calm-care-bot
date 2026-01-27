export interface Symptom {
  id: string;
  name: string;
  category: string;
  description?: string;
}

export interface SymptomEntry {
  symptoms: string[];
  freeText: string;
  duration?: string;
  severity?: number;
}

export interface FollowUpQuestion {
  id: string;
  question: string;
  type: "boolean" | "scale" | "multiChoice" | "text";
  options?: string[];
}

export interface TriageResult {
  urgency: "emergency" | "doctor" | "self-care";
  title: string;
  description: string;
  reasoning: string;
  nextSteps: string[];
  disclaimer: string;
}

export interface AssessmentState {
  step: "disclaimer" | "symptoms" | "followup" | "results";
  currentFollowUpIndex: number;
  symptomEntry: SymptomEntry;
  followUpAnswers: Record<string, string | number | boolean>;
  result: TriageResult | null;
}
