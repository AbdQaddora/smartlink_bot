"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { cn } from "@/lib/utils";

/**
 * App frame: a fixed right sidebar on desktop (RTL) that collapses into an
 * off-canvas drawer on mobile, plus the top header + scrollable content.
 */
export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);
  const closeNav = () => setNavOpen(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <Sidebar className="sticky top-0 hidden lg:flex" />

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          navOpen ? "" : "pointer-events-none"
        )}
        aria-hidden={!navOpen}
      >
        <div
          onClick={closeNav}
          className={cn(
            "absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity",
            navOpen ? "opacity-100" : "opacity-0"
          )}
        />
        <Sidebar
          onNavigate={closeNav}
          className={cn(
            "absolute inset-y-0 right-0 shadow-2xl transition-transform duration-300 ease-out",
            navOpen ? "translate-x-0" : "translate-x-full"
          )}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuClick={() => setNavOpen(true)} />
        <main className="flex-1 overflow-x-hidden px-4 py-4 sm:px-6 sm:py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
