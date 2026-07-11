"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
  className?: string;
}

/**
 * Minimal controlled checkbox — a rounded square that fills with the brand
 * colour and shows a white check when selected. Custom (no Radix) to keep
 * the auth screens dependency-light and matched to the design.
 */
export function Checkbox({
  checked,
  onCheckedChange,
  id,
  className,
}: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      id={id}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "flex size-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-colors outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring/40",
        checked
          ? "border-primary bg-primary text-primary-foreground"
          : "border-input bg-card hover:border-primary/50",
        className
      )}
    >
      {checked && <Check className="size-3" strokeWidth={3} />}
    </button>
  );
}
