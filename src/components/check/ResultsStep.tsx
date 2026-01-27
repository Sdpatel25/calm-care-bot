import { AlertTriangle, Phone, Stethoscope, Heart, Info, RotateCcw, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { TriageResult } from "@/types/triage";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ResultsStepProps {
  result: TriageResult;
  onStartOver: () => void;
}

const urgencyConfig = {
  emergency: {
    icon: Phone,
    bgClass: "bg-urgent/10",
    borderClass: "border-urgent/30",
    iconClass: "text-urgent",
    badgeClass: "bg-urgent text-urgent-foreground",
    label: "Seek immediate care",
  },
  doctor: {
    icon: Stethoscope,
    bgClass: "bg-caution/10",
    borderClass: "border-caution/30",
    iconClass: "text-caution",
    badgeClass: "bg-caution text-caution-foreground",
    label: "See a doctor soon",
  },
  "self-care": {
    icon: Heart,
    bgClass: "bg-safe/10",
    borderClass: "border-safe/30",
    iconClass: "text-safe",
    badgeClass: "bg-safe text-safe-foreground",
    label: "Self-care may be appropriate",
  },
};

export function ResultsStep({ result, onStartOver }: ResultsStepProps) {
  const [reasoningOpen, setReasoningOpen] = useState(false);
  const config = urgencyConfig[result.urgency];
  const Icon = config.icon;

  return (
    <div className="mx-auto max-w-2xl animate-fade-in-up">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-bold text-foreground">Your Assessment</h1>
        <p className="text-muted-foreground">
          Based on what you shared, here's our guidance
        </p>
      </div>

      {/* Main result card */}
      <Card className={cn("mb-6 border-2 shadow-lg", config.borderClass, config.bgClass)}>
        <CardHeader className="text-center pb-4">
          <div className={cn("mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full", config.bgClass)}>
            <Icon className={cn("h-8 w-8", config.iconClass)} />
          </div>
          <span className={cn("inline-block rounded-full px-4 py-1 text-sm font-medium", config.badgeClass)}>
            {config.label}
          </span>
          <h2 className="mt-4 text-xl font-bold text-foreground">{result.title}</h2>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">{result.description}</p>
        </CardContent>
      </Card>

      {/* Emergency call to action */}
      {result.urgency === "emergency" && (
        <Card className="mb-6 border-urgent/50 bg-urgent/5">
          <CardContent className="flex items-center gap-4 py-4">
            <Phone className="h-8 w-8 text-urgent" />
            <div>
              <p className="font-semibold text-foreground">Call emergency services now</p>
              <p className="text-sm text-muted-foreground">
                Dial 911 (US) or your local emergency number immediately
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next steps */}
      <Card className="mb-6 border-border/50">
        <CardHeader className="pb-3">
          <h3 className="text-lg font-semibold text-foreground">Recommended next steps</h3>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {result.nextSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  {index + 1}
                </span>
                <span className="text-sm text-muted-foreground">{step}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Reasoning collapsible */}
      <Collapsible open={reasoningOpen} onOpenChange={setReasoningOpen}>
        <Card className="mb-6 border-border/50">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-medium text-foreground">Why am I seeing this result?</h3>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform",
                    reasoningOpen && "rotate-180"
                  )}
                />
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <p className="text-sm leading-relaxed text-muted-foreground">{result.reasoning}</p>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Disclaimer */}
      <Card className="mb-6 border-caution/30 bg-caution/5">
        <CardContent className="py-4">
          <div className="flex gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-caution" />
            <div>
              <p className="mb-1 text-sm font-medium text-foreground">Important reminder</p>
              <p className="text-xs leading-relaxed text-muted-foreground">{result.disclaimer}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Start over */}
      <div className="text-center">
        <Button variant="outline" onClick={onStartOver} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Start a new assessment
        </Button>
      </div>
    </div>
  );
}
