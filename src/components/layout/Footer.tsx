import { Heart, Shield, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Important Disclaimer */}
        <div className="mb-8 rounded-lg border border-caution/30 bg-caution/5 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-caution" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">Important Medical Disclaimer</p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                TriageAI provides general health guidance only and is not a substitute for professional medical advice, 
                diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider 
                with any questions you may have regarding a medical condition. If you think you may have a medical 
                emergency, call your doctor or emergency services immediately.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Heart className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">TriageAI</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Calm, trustworthy symptom guidance when you need clarity.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/check" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Check Symptoms
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                How It Works
              </Link>
            </nav>
          </div>

          {/* Trust Indicators */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Your Safety</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>No personal health data stored</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Session-based only. Your information is not saved after you close the browser.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-border/50 pt-6">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} TriageAI. Built for educational and demonstration purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
