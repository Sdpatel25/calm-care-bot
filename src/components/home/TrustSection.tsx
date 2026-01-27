import { AlertTriangle, Lock, Brain, UserCheck } from "lucide-react";

const trustPoints = [
  {
    icon: AlertTriangle,
    title: "Not a replacement for doctors",
    description:
      "TriageAI helps you understand urgency, not diagnose conditions. Always consult healthcare professionals for medical decisions.",
  },
  {
    icon: Lock,
    title: "Session-based privacy",
    description:
      "We don't store your health information. Once you close the browser, your session data is gone. No accounts, no data retention.",
  },
  {
    icon: Brain,
    title: "Transparent reasoning",
    description:
      "We show you why we're suggesting a particular course of action. No black boxes—you see the logic behind every recommendation.",
  },
  {
    icon: UserCheck,
    title: "You're in control",
    description:
      "This tool is here to inform, not alarm. You always have the final say in what action to take based on your own judgment.",
  },
];

export function TrustSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Built on trust and transparency
          </h2>
          <p className="mb-12 text-muted-foreground">
            We believe in being honest about what this tool can and cannot do. Your trust is our priority.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="card-elevated rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <point.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{point.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
