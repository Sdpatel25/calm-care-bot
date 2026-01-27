import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import type { FollowUpQuestion } from "@/types/triage";
import { useState } from "react";

interface FollowUpStepProps {
  question: FollowUpQuestion;
  currentIndex: number;
  totalQuestions: number;
  previousAnswer?: string | number | boolean;
  onAnswer: (answer: string | number | boolean) => void;
  onBack: () => void;
}

export function FollowUpStep({
  question,
  currentIndex,
  totalQuestions,
  previousAnswer,
  onAnswer,
  onBack,
}: FollowUpStepProps) {
  const [answer, setAnswer] = useState<string | number | boolean>(
    previousAnswer ?? (question.type === "scale" ? 5 : "")
  );
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const handleContinue = () => {
    onAnswer(answer);
  };

  const canContinue = () => {
    if (question.type === "scale") return true;
    if (question.type === "boolean") return answer !== "";
    if (question.type === "multiChoice") return answer !== "";
    if (question.type === "text") return (answer as string).trim().length > 0;
    return false;
  };

  return (
    <div className="mx-auto max-w-2xl animate-slide-in-right">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span className="text-muted-foreground">{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="border-border/50 shadow-lg">
        <CardHeader className="text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-primary">
            Follow-up question
          </p>
          <h2 className="text-xl font-semibold text-foreground">{question.question}</h2>
        </CardHeader>

        <CardContent className="pt-4">
          {question.type === "boolean" && (
            <RadioGroup
              value={answer === true ? "yes" : answer === false ? "no" : ""}
              onValueChange={(value) => setAnswer(value === "yes")}
              className="flex flex-col gap-3"
            >
              {["yes", "no"].map((option) => (
                <div
                  key={option}
                  className={`flex items-center space-x-3 rounded-lg border p-4 transition-colors cursor-pointer ${
                    (answer === true && option === "yes") || (answer === false && option === "no")
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setAnswer(option === "yes")}
                >
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="cursor-pointer text-base capitalize">
                    {option === "yes" ? "Yes" : "No"}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {question.type === "multiChoice" && question.options && (
            <RadioGroup
              value={answer as string}
              onValueChange={setAnswer}
              className="flex flex-col gap-3"
            >
              {question.options.map((option) => (
                <div
                  key={option}
                  className={`flex items-center space-x-3 rounded-lg border p-4 transition-colors cursor-pointer ${
                    answer === option
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setAnswer(option)}
                >
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="cursor-pointer text-base">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {question.type === "scale" && (
            <div className="space-y-6 py-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Mild</span>
                <span className="text-2xl font-bold text-primary">{answer as number}</span>
                <span>Severe</span>
              </div>
              <Slider
                value={[answer as number]}
                onValueChange={(value) => setAnswer(value[0])}
                min={1}
                max={10}
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <span key={num}>{num}</span>
                ))}
              </div>
            </div>
          )}

          {question.type === "text" && (
            <Textarea
              placeholder="Please describe..."
              value={answer as string}
              onChange={(e) => setAnswer(e.target.value)}
              rows={4}
              className="resize-none"
            />
          )}
        </CardContent>

        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleContinue} disabled={!canContinue()} className="gap-2">
            {currentIndex === totalQuestions - 1 ? "See results" : "Continue"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Thanks for sharing. This helps us understand your situation better.
      </p>
    </div>
  );
}
