import { FileText, MessageCircle, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Describe your symptoms",
    description:
      "Tell us what you're experiencing using our guided checkboxes or in your own words. Take your time—there's no rush.",
  },
  {
    icon: MessageCircle,
    title: "Answer a few questions",
    description:
      "We'll ask targeted follow-up questions to better understand your situation. One question at a time, so it's never overwhelming.",
  },
  {
    icon: CheckCircle,
    title: "Get clear guidance",
    description:
      "Receive an urgency assessment with clear reasoning. We'll explain why we're suggesting this next step and what you should consider.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            A calm, step-by-step process
          </h2>
          <p className="mb-12 text-muted-foreground">
            You're doing the right thing by checking. Here's how TriageAI guides you through understanding your symptoms.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center"
              >
                {/* Connector line (desktop) */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-border md:block" />
                )}

                {/* Step number and icon */}
                <div className="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-card shadow-sm ring-1 ring-border">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>

                {/* Step indicator */}
                <span className="mb-2 text-xs font-medium uppercase tracking-wider text-primary">
                  Step {index + 1}
                </span>

                <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
