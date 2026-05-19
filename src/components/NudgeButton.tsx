"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NudgeButtonProps {
  committedToday: boolean;
}

const PRESET_NAMES = [
  { label: "Anonymous", value: "Anonymous" },
];

export default function NudgeButton({ committedToday }: NudgeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [cooldownRemaining, setCooldownRemaining] = useState<number | null>(null);

  // Check client-side cooldown on mount & interval
  useEffect(() => {
    const checkCooldown = () => {
      const lastNudgeTime = localStorage.getItem("sibhi_last_nudge_timestamp");
      if (lastNudgeTime) {
        const diff = Date.now() - parseInt(lastNudgeTime, 10);
        const cooldownMs = 30 * 60 * 1000; // 30 minutes in ms
        if (diff < cooldownMs) {
          setCooldownRemaining(cooldownMs - diff);
        } else {
          setCooldownRemaining(null);
          localStorage.removeItem("sibhi_last_nudge_timestamp");
        }
      }
    };

    checkCooldown();
    const interval = setInterval(checkCooldown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePresetClick = (val: string) => {
    setSelectedPreset(val);
    setName(val);
  };

  const handleSendNudge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/nudge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send nudge.");
      }

      setStatus("success");
      localStorage.setItem("sibhi_last_nudge_timestamp", Date.now().toString());
      setCooldownRemaining(30 * 60 * 1000); // 30 minutes cooldown

      // Close modal after a short delay
      setTimeout(() => {
        setIsOpen(false);
        // Reset state
        setStatus("idle");
        setName("");
        setSelectedPreset(null);
      }, 3000);
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred.");
    }
  };

  const formatCooldown = (ms: number) => {
    const mins = Math.ceil(ms / (1000 * 60));
    return `${mins} min${mins > 1 ? "s" : ""}`;
  };

  return (
    <div className="mt-6 w-full">
      {committedToday ? (
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02] text-emerald-400/80 text-xs font-light tracking-wide">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          All caught up! Sibhi has already committed to GitHub today.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl border border-rose-500/10 bg-rose-500/[0.01] text-xs font-light text-rose-400/80">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              No commits pushed yet today. Keep the streak alive!
            </div>
            
            {cooldownRemaining ? (
              <span className="text-[11px] text-white/30 italic">
                Nudged! Cooldown: {formatCooldown(cooldownRemaining)}
              </span>
            ) : (
              <button
                onClick={() => setIsOpen(true)}
                className="self-start sm:self-auto px-4 py-2 text-xs font-medium rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 hover:border-rose-500/50 text-white transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.05)] cursor-pointer"
              >
                Nudge Sibhi
              </button>
            )}
          </div>
        </div>
      )}

      {/* Glassmorphism Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => status !== "sending" && setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.08] bg-neutral-900/90 p-6 md:p-8 shadow-2xl backdrop-blur-2xl"
            >
              {/* Radial glow background effect */}
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                disabled={status === "sending"}
                className="absolute top-4 right-4 text-white/30 hover:text-white/70 p-1.5 rounded-lg border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative">
                <span className="text-[9px] tracking-[0.3em] uppercase text-rose-400 font-medium">
                  Streak Keeper
                </span>
                <h3 className="text-xl font-light text-white mt-1">
                  Nudge Sibhi <span className="text-white/40">to Commit</span>
                </h3>
                <p className="mt-2 text-xs text-white/40 leading-relaxed font-light">
                  Choose a preset or type your name below. Sibhi will receive a direct, secure email alert with your name!
                </p>

                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 flex flex-col items-center justify-center p-6 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02] text-center"
                  >
                    <div className="w-12 h-12 rounded-full border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 animate-bounce">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-medium text-white">Nudge Transmitted!</h4>
                    <p className="text-xs text-white/50 mt-1 font-light">
                      Email alert successfully dispatched to Sibhi. You just kept his streak alive!
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSendNudge} className="mt-6 space-y-5">
                    {/* Presets Grid */}
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.1em] uppercase text-white/30 block font-light">
                        Select identity preset
                      </label>
                      <div className="flex gap-2">
                        {PRESET_NAMES.map((preset) => (
                          <button
                            key={preset.value}
                            type="button"
                            onClick={() => handlePresetClick(preset.value)}
                            className={`px-2 py-2.5 text-xs font-light rounded-lg border text-center transition-all duration-300 cursor-pointer ${
                              selectedPreset === preset.value
                                ? "bg-white/[0.08] border-white/30 text-white"
                                : "bg-white/[0.01] border-white/[0.04] text-white/50 hover:bg-white/[0.03] hover:text-white"
                            }`}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Input */}
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.1em] uppercase text-white/30 block font-light">
                        Or enter your name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setSelectedPreset(null);
                        }}
                        placeholder="e.g. John Doe"
                        maxLength={50}
                        required
                        disabled={status === "sending"}
                        className="w-full px-4 py-3 rounded-lg border border-white/[0.05] bg-black/40 text-white placeholder-white/20 text-xs font-light tracking-wide focus:outline-none focus:border-white/25 focus:ring-1 focus:ring-white/25 transition-all"
                      />
                    </div>

                    {status === "error" && (
                      <div className="p-3 rounded-lg border border-rose-500/10 bg-rose-500/[0.02] text-rose-400 text-xs font-light">
                        {errorMessage}
                      </div>
                    )}

                    {/* Action Button */}
                    <button
                      type="submit"
                      disabled={status === "sending" || !name.trim()}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-white text-black hover:bg-white/90 disabled:bg-white/20 disabled:text-black/40 font-medium text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-pointer"
                    >
                      {status === "sending" ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Transmitting...
                        </>
                      ) : (
                        "Confirm & Send Nudge"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
