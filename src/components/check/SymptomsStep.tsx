import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { SymptomEntry } from "@/types/triage";

interface SymptomsStepProps {
  initialData: SymptomEntry;
  onNext: (data: SymptomEntry) => void;
}

const symptomCategories = [
  {
    name: "General",
    symptoms: ["Fever", "Fatigue", "Chills", "Night sweats", "Unexplained weight loss"],
  },
  {
    name: "Head & Neurological",
    symptoms: ["Headache", "Dizziness", "Confusion", "Vision changes", "Numbness or tingling"],
  },
  {
    name: "Respiratory",
    symptoms: ["Cough", "Shortness of breath", "Sore throat", "Congestion", "Wheezing"],
  },
  {
    name: "Digestive",
    symptoms: ["Nausea", "Vomiting", "Abdominal pain", "Diarrhea", "Loss of appetite"],
  },
  {
    name: "Musculoskeletal",
    symptoms: ["Muscle pain", "Joint pain", "Back pain", "Weakness", "Swelling"],
  },
  {
    name: "Skin",
    symptoms: ["Rash", "Itching", "Unusual bruising", "Skin discoloration", "Wounds that won't heal"],
  },
];

export function SymptomsStep({ initialData, onNext }: SymptomsStepProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(initialData.symptoms);
  const [freeText, setFreeText] = useState(initialData.freeText);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = symptomCategories.map((category) => ({
    ...category,
    symptoms: category.symptoms.filter((symptom) =>
      symptom.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.symptoms.length > 0);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const handleNext = () => {
    onNext({
      symptoms: selectedSymptoms,
      freeText,
    });
  };

  const canProceed = selectedSymptoms.length > 0 || freeText.trim().length > 10;

  return (
    <div className="mx-auto max-w-3xl animate-fade-in-up">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-bold text-foreground">What are you experiencing?</h1>
        <p className="text-muted-foreground">
          Select symptoms from the list below and/or describe what you're feeling in your own words.
        </p>
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search symptoms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Symptom Categories */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <p className="text-sm font-medium text-foreground">Common symptoms</p>
            <p className="text-xs text-muted-foreground">
              Select all that apply. {selectedSymptoms.length > 0 && `(${selectedSymptoms.length} selected)`}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {filteredCategories.map((category) => (
              <div key={category.name}>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {category.name}
                </p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {category.symptoms.map((symptom) => (
                    <div
                      key={symptom}
                      className={`flex items-center space-x-3 rounded-lg border p-3 transition-colors cursor-pointer ${
                        selectedSymptoms.includes(symptom)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 hover:bg-accent/50"
                      }`}
                      onClick={() => toggleSymptom(symptom)}
                    >
                      <Checkbox
                        id={symptom}
                        checked={selectedSymptoms.includes(symptom)}
                        onCheckedChange={() => toggleSymptom(symptom)}
                      />
                      <Label htmlFor={symptom} className="cursor-pointer text-sm">
                        {symptom}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Free text */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <p className="text-sm font-medium text-foreground">Describe in your own words</p>
            <p className="text-xs text-muted-foreground">
              Share any additional details about what you're experiencing. Take your time.
            </p>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="For example: 'I've had a throbbing headache for 2 days, mostly on the right side. It gets worse when I bend over...'"
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </CardContent>
          <CardFooter className="flex items-center justify-between border-t pt-4">
            <p className="text-xs text-muted-foreground">
              The more detail you provide, the better we can guide you.
            </p>
          </CardFooter>
        </Card>

        {/* Continue button */}
        <div className="flex justify-end">
          <Button onClick={handleNext} disabled={!canProceed} className="gap-2">
            Continue to questions
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {!canProceed && (
          <p className="text-center text-sm text-muted-foreground">
            Please select at least one symptom or describe what you're experiencing.
          </p>
        )}
      </div>
    </div>
  );
}
