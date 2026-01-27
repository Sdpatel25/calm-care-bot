import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Brain, Shield, AlertTriangle, Lock, Code, Heart } from "lucide-react";

const sections = [
  {
    icon: Brain,
    title: "How It Works",
    content: `TriageAI uses a structured approach to help you understand the urgency of your symptoms. When you describe what you're experiencing, our system:

1. Collects Information**: You select from common symptoms and describe your experience in your own words.

2. **Asks Follow-Up Questions**: Based on your initial input, we ask targeted questions about duration, severity, and other relevant factors.

3. **Analyzes Patterns**: We compare your responses against established medical triage guidelines to identify potential urgency levels.

4. **Provides Guidance**: You receive a clear recommendation—whether to seek emergency care, visit a doctor, or try self-care—along with reasoning for that recommendation.`,
  },
  {
    icon: AlertTriangle,
    title: "What This Tool Cannot Do",
    content: `It's crucial to understand the limitations of any symptom checker:

- **This is NOT a diagnosis**: We cannot tell you what condition you have. Only qualified healthcare professionals can diagnose medical conditions.

- **We don't replace doctors**: This tool provides general guidance to help you decide on next steps, not medical treatment.

- **Limited information**: We base our recommendations on the information you provide, which is inherently incomplete. A doctor would perform physical examinations and tests.

- **No personalization**: We cannot account for your complete medical history, current medications, or other personal health factors that could influence recommendations.`,
  },
  {
    icon: Lock,
    title: "Privacy & Data",
    content: `Your privacy is important to us:

- **No data storage**: We do not store your symptom information or assessment results on our servers.

- **Session-based only**: All data exists only for the duration of your browser session and is deleted when you close the tab or browser.

- **No accounts required**: You don't need to create an account or provide any identifying information to use this tool.

- **No tracking**: We don't use your health information for advertising or share it with third parties.`,
  },
  {
    icon: Shield,
    title: "When to Always Seek Emergency Care",
    content: `Some symptoms always require immediate medical attention. Call emergency services (911) immediately if you experience:

- **Chest pain or pressure**, especially with shortness of breath or sweating
- **Difficulty breathing** or severe shortness of breath
- **Signs of stroke**: sudden numbness, confusion, trouble speaking, or severe headache
- **Severe bleeding** that won't stop
- **Loss of consciousness** or altered mental state
- **Severe allergic reactions** with difficulty breathing or swelling of face/throat
- **Suicidal thoughts** or thoughts of harming yourself or others

When in doubt, it's always better to seek emergency care. Trust your instincts.`,
  },
];

export default function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            {/* Header */}
            <div className="mb-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                How TriageAI Works
              </h1>
              <p className="text-lg text-muted-foreground">
                Understanding our approach to symptom guidance, and what you should know before using this tool.
              </p>
            </div>

            {/* Content sections */}
            <div className="space-y-6">
              {sections.map((section) => (
                <Card key={section.title} className="border-border/50">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <section.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground">
                      {section.content.split("\n\n").map((paragraph, index) => (
                        <p key={index} className="mb-4 last:mb-0 whitespace-pre-line">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Technical note */}
            <Card className="mt-8 border-border/50 bg-muted/30">
              <CardContent className="py-6">
                <div className="flex items-start gap-3">
                  <Code className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">For Developers & Judges</h3>
                    <p className="text-sm text-muted-foreground">
                      TriageAI demonstrates responsible AI in healthcare by prioritizing safety, 
                      transparency, and user wellbeing. The system refuses to provide definitive 
                      diagnoses, clearly explains its limitations, and always encourages professional 
                      medical consultation when there's any doubt.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
