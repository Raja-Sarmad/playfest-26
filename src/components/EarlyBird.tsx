"use client";

import { useEffect, useState } from "react";

const KEY = "playfest-earlybird-end";
const DISMISS = "playfest-earlybird-dismissed";
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

type Left = { d: number; h: number; m: number; s: number };

function getLeft(end: number): Left {
  const t = Math.max(0, end - Date.now());
  return {
    d: Math.floor(t / 86400000),
    h: Math.floor((t % 86400000) / 3600000),
    m: Math.floor((t % 3600000) / 60000),
    s: Math.floor((t % 60000) / 1000),
  };
}

export default function EarlyBird() {
  const [open, setOpen] = useState(false);
  const [end, setEnd] = useState(0);
  const [left, setLeft] = useState<Left>({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    let stored = localStorage.getItem(KEY);
    if (!stored) {
      stored = String(Date.now() + WEEK_MS);
      localStorage.setItem(KEY, stored);
    }
    const endAt = Number(stored);
    setEnd(endAt);
    setLeft(getLeft(endAt));
    const dismissed = sessionStorage.getItem(DISMISS);
    if (endAt > Date.now() && !dismissed) setOpen(true);
  }, []);

  const close = () => {
    sessionStorage.setItem(DISMISS, "1");
    setOpen(false);
  };

  useEffect(() => {
    if (!end) return;
    const id = setInterval(() => {
      const next = getLeft(end);
      setLeft(next);
      if (end - Date.now() <= 0) setOpen(false);
    }, 1000);
    return () => clearInterval(id);
  }, [end]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  const units = [
    { v: left.d, l: "Days" },
    { v: left.h, l: "Hours" },
    { v: left.m, l: "Mins" },
    { v: left.s, l: "Secs" },
  ];

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#020817]/80 p-4 backdrop-blur-md"
      onClick={close}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-cyan-300/40 bg-gradient-to-b from-[#06224a] to-[#020817] p-7 pt-12 text-center shadow-[0_0_80px_-20px_rgba(58,214,255,0.7)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/35 bg-white/5 text-xl leading-none text-white transition-colors hover:bg-cyan-400/15 hover:text-cyan-200"
        >
          ×
        </button>
        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
        <p className="text-[11px] font-black uppercase tracking-[0.35em] text-cyan-300">
          Early bird
        </p>
        <h2 className="font-display mt-2 text-3xl font-bold uppercase text-white sm:text-4xl">
          Discount on <span className="text-cyan-300">all games</span>
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          One week only. Lock your slot before the timer hits zero.
        </p>

        <div className="mt-6 grid grid-cols-4 gap-2">
          {units.map((u) => (
            <div
              key={u.l}
              className="rounded-2xl border border-cyan-300/25 bg-white/5 py-3"
            >
              <div className="font-display text-3xl font-bold text-cyan-300">
                {String(u.v).padStart(2, "0")}
              </div>
              <div className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {u.l}
              </div>
            </div>
          ))}
        </div>

        <a
          href="#contact"
          onClick={close}
          className="btn-electric mt-6 inline-block rounded-full px-8 py-3 text-xs font-black uppercase tracking-widest"
        >
          Register now
        </a>
        <button
          type="button"
          onClick={close}
          className="mt-3 block w-full text-xs font-semibold uppercase tracking-widest text-slate-400 hover:text-white"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
