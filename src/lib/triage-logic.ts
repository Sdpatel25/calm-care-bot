import type { FollowUpQuestion, SymptomEntry, TriageResult } from "@/types/triage";

// Red flag symptoms that warrant immediate attention
const emergencySymptoms = [
  "Chest pain",
  "Difficulty breathing",
  "Severe bleeding",
  "Loss of consciousness",
  "Confusion",
  "Severe headache",
  "Numbness or tingling",
  "Vision changes",
];

const urgentSymptoms = [
  "High fever",
  "Persistent vomiting",
  "Severe abdominal pain",
  "Severe dizziness",
  "Weakness",
];

// Generate follow-up questions based on symptoms
export function generateFollowUpQuestions(entry: SymptomEntry): FollowUpQuestion[] {
  const questions: FollowUpQuestion[] = [];

  // Duration question
  questions.push({
    id: "duration",
    question: "How long have you been experiencing these symptoms?",
    type: "multiChoice",
    options: [
      "Less than 24 hours",
      "1-3 days",
      "4-7 days",
      "1-2 weeks",
      "More than 2 weeks",
    ],
  });

  // Severity question
  questions.push({
    id: "severity",
    question: "On a scale of 1-10, how would you rate the overall severity of your symptoms?",
    type: "scale",
  });

  // Worsening question
  questions.push({
    id: "worsening",
    question: "Have your symptoms been getting worse over time?",
    type: "boolean",
  });

  // Activity impact
  questions.push({
    id: "activity",
    question: "Are your symptoms affecting your daily activities?",
    type: "multiChoice",
    options: [
      "Not at all - I can do everything normally",
      "Slightly - Some activities are harder",
      "Moderately - Many activities are difficult",
      "Severely - I can barely do basic tasks",
    ],
  });

  // Pre-existing conditions
  questions.push({
    id: "conditions",
    question: "Do you have any pre-existing health conditions?",
    type: "boolean",
  });

  return questions;
}

// Calculate triage result based on symptoms and answers
export function calculateTriageResult(
  entry: SymptomEntry,
  answers: Record<string, string | number | boolean>
): TriageResult {
  const allSymptoms = entry.symptoms.map((s) => s.toLowerCase());
  const freeTextLower = entry.freeText.toLowerCase();

  // Check for emergency symptoms
  const hasEmergencySymptom = emergencySymptoms.some(
    (symptom) =>
      allSymptoms.some((s) => s.toLowerCase().includes(symptom.toLowerCase())) ||
      freeTextLower.includes(symptom.toLowerCase())
  );

  // Check for urgent symptoms
  const hasUrgentSymptom = urgentSymptoms.some(
    (symptom) =>
      allSymptoms.some((s) => s.toLowerCase().includes(symptom.toLowerCase())) ||
      freeTextLower.includes(symptom.toLowerCase())
  );

  // Get answer values
  const severity = (answers.severity as number) || 5;
  const isWorsening = answers.worsening === true;
  const activityImpact = (answers.activity as string) || "";
  const hasConditions = answers.conditions === true;
  const duration = (answers.duration as string) || "";

  // Scoring logic
  let urgencyScore = 0;

  if (hasEmergencySymptom) urgencyScore += 50;
  if (hasUrgentSymptom) urgencyScore += 25;
  if (severity >= 8) urgencyScore += 20;
  else if (severity >= 6) urgencyScore += 10;
  if (isWorsening) urgencyScore += 15;
  if (activityImpact.includes("Severely")) urgencyScore += 15;
  else if (activityImpact.includes("Moderately")) urgencyScore += 10;
  if (hasConditions) urgencyScore += 10;
  if (duration.includes("More than 2 weeks")) urgencyScore += 10;

  // Determine urgency level
  let urgency: "emergency" | "doctor" | "self-care";
  let title: string;
  let description: string;
  let nextSteps: string[];
  let reasoning: string;

  if (urgencyScore >= 50 || hasEmergencySymptom) {
    urgency = "emergency";
    title = "Please seek immediate medical attention";
    description =
      "Based on the symptoms you've described, we recommend you seek emergency care right away. Some of your symptoms may indicate a condition that requires urgent medical evaluation.";
    nextSteps = [
      "Call emergency services (911) or go to the nearest emergency room immediately",
      "If possible, have someone drive you or stay with you",
      "Do not drive yourself if you're feeling unwell",
      "Bring a list of your current medications if available",
    ];
    reasoning = `Your assessment indicated ${hasEmergencySymptom ? "potential emergency symptoms" : "a combination of concerning factors"} including ${severity >= 8 ? "high symptom severity" : ""}${isWorsening ? ", worsening symptoms" : ""}${hasConditions ? ", and pre-existing conditions" : ""}. Given these factors, immediate medical evaluation is the safest course of action.`;
  } else if (urgencyScore >= 25) {
    urgency = "doctor";
    title = "We recommend seeing a doctor";
    description =
      "Your symptoms warrant professional medical attention. While this doesn't appear to be an emergency, you should schedule an appointment with a healthcare provider soon.";
    nextSteps = [
      "Schedule an appointment with your primary care doctor within the next 1-2 days",
      "If symptoms worsen significantly, consider urgent care or emergency services",
      "Keep track of your symptoms and any changes",
      "Rest and stay hydrated while waiting for your appointment",
      "Avoid self-medicating without professional guidance",
    ];
    reasoning = `Based on your responses, you're experiencing ${urgentSymptoms.some((s) => allSymptoms.includes(s.toLowerCase())) ? "symptoms that typically require medical evaluation" : "a pattern of symptoms"} with ${severity >= 6 ? "notable severity" : "moderate concern"}. ${isWorsening ? "The fact that symptoms are worsening adds to our recommendation." : ""} A healthcare provider can properly assess your condition and recommend appropriate treatment.`;
  } else {
    urgency = "self-care";
    title = "Self-care may be appropriate for now";
    description =
      "Based on what you've shared, your symptoms may be manageable with self-care. However, please monitor your condition and seek medical help if anything changes or worsens.";
    nextSteps = [
      "Get plenty of rest and stay well-hydrated",
      "Monitor your symptoms for any changes",
      "Use over-the-counter remedies as appropriate for symptom relief",
      "If symptoms persist beyond a week or worsen, consult a healthcare provider",
      "Don't hesitate to seek medical attention if you feel concerned",
    ];
    reasoning = `Your symptoms appear to be relatively mild with ${severity < 6 ? "low severity" : "manageable intensity"}. ${!isWorsening ? "They don't appear to be worsening, which is a good sign." : ""} ${!hasConditions ? "The absence of pre-existing conditions is also reassuring." : "Given your pre-existing conditions, please remain vigilant."} Self-care measures may help, but always trust your instincts—if something feels wrong, it's okay to seek professional advice.`;
  }

  return {
    urgency,
    title,
    description,
    reasoning,
    nextSteps,
    disclaimer:
      "This assessment is for informational purposes only and is not a medical diagnosis. It should not replace professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions about a medical condition. If you think you may have a medical emergency, call your doctor or emergency services immediately.",
  };
}
