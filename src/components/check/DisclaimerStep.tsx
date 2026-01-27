import { AlertTriangle, Shield, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface DisclaimerStepProps {
  onAccept: () => void;
}

const acknowledgments = [
  "This tool provides general guidance only, not medical diagnosis",
  "Results are based on limited information and may not reflect your actual condition",
  "In case of emergency, call emergency services immediately",
  "Always consult a healthcare professional for medical advice",
];

export function DisclaimerStep({ onAccept }: DisclaimerStepProps) {
  return (
    <div className="mx-auto max-w-2xl animate-fade-in-up">
      <Card className="border-border/50 shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Before we begin</h1>
          <p className="text-muted-foreground">
            Please read and acknowledge the following
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Important warning */}
          <div className="rounded-lg border border-caution/30 bg-caution/5 p-4">
            <div className="flex gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-caution" />
              <div>
                <p className="font-medium text-foreground">Emergency Warning</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  If you're experiencing chest pain, difficulty breathing, severe bleeding, 
                  loss of consciousness, or any life-threatening symptoms, please call 
                  emergency services (911) immediately. Do not use this tool in emergencies.
                </p>
              </div>
            </div>
          </div>

          {/* Acknowledgments */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">
              By continuing, you understand and agree that:
            </p>
            <ul className="space-y-3">
              {acknowledgments.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-safe" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 pt-2">
          <Button onClick={onAccept} className="w-full" size="lg">
            I understand, continue to symptom checker
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            You're doing the right thing by seeking information. Let's proceed carefully.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
