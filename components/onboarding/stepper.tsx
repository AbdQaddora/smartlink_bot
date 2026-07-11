import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepperProps {
  /** Ordered step labels, right-to-left in the RTL layout. */
  steps: string[];
  /** 1-based index of the active step. */
  current: number;
}

/**
 * Horizontal progress stepper for the onboarding wizard. Completed steps
 * collapse to a filled emerald check, the active step is outlined, and the
 * connecting rail fills up to the current position.
 */
export function Stepper({ steps, current }: StepperProps) {
  return (
    <div className="flex items-center">
      {steps.map((label, i) => {
        const num = i + 1;
        const done = num < current;
        const active = num === current;
        const hasLine = i < steps.length - 1;

        return (
          <div
            key={label}
            className={cn("flex items-center", hasLine && "flex-1")}
          >
            <div className="flex shrink-0 flex-col items-center gap-2">
              <div
                className={cn(
                  "flex size-10 items-center justify-center rounded-full text-sm font-bold transition-all",
                  done && "bg-primary text-primary-foreground",
                  active && "border-2 border-primary bg-accent text-primary",
                  !done &&
                    !active &&
                    "bg-secondary text-muted-foreground"
                )}
              >
                {done ? <Check className="size-4" strokeWidth={3} /> : num}
              </div>
              <span
                className={cn(
                  "text-xs font-semibold whitespace-nowrap",
                  done || active ? "text-primary" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </div>

            {hasLine && (
              <div
                className={cn(
                  "mx-2 mb-6 h-0.5 flex-1 rounded-full transition-colors",
                  done ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
