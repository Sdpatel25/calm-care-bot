import { ArrowRight, Shield, Clock, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="container relative mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          {/* Trust badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground animate-fade-in">
            <Shield className="h-4 w-4 text-primary" />
            <span>Safe, private, and non-diagnostic guidance</span>
          </div>

          {/* Main heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl animate-fade-in-up">
            Understand your symptoms with{" "}
            <span className="text-primary">calm clarity</span>
          </h1>

          {/* Subheading */}
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground md:text-xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            When you're not feeling well, uncertainty can be overwhelming. TriageAI helps you 
            understand what your symptoms might mean and suggests the safest next step—whether 
            that's self-care, seeing a doctor, or seeking immediate help.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Button asChild size="lg" className="gap-2 text-base">
              <Link to="/check">
                Check your symptoms safely
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base">
              <Link to="/about">Learn how it works</Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">2-3 minutes</span>
              <span className="text-xs text-muted-foreground">Quick assessment</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">Private</span>
              <span className="text-xs text-muted-foreground">No data stored</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">Guidance only</span>
              <span className="text-xs text-muted-foreground">Not a diagnosis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
