"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Member = {
  name: string;
  role: string;
  file: string;
  featured?: boolean;
};

// ROW 1: 3 Members (Center is President)
const TOP: Member[] = [
  { name: "Ammar Khan", role: "Vice President", file: "ammar-khan" },
  { name: "Sarmad Masood", role: "President", file: "sarmad-masood", featured: true },
  { name: "Umar Siddiqui", role: "Vice President", file: "umar-siddiqui" },
];

// ROW 2: 6 Coordinators
const MID: Member[] = [
  { name: "Muhammad Hashir", role: "Coordinator", file: "hashir" },
  { name: "Umar Riaz", role: "Coordinator", file: "umar-riaz" },
  { name: "Masab Sheikh", role: "Coordinator", file: "masab-sheikh" },
  { name: "Azim ul Qadar", role: "Coordinator", file: "azim-ul-qadar" },
  { name: "Syeda Tamkeen Fatima", role: "Coordinator", file: "tamkeen-fatima" },
  { name: "Quratulain", role: "Coordinator", file: "quratulain" },
];

// ROW 3: 5 Volunteers
const BOTTOM: Member[] = [
  { name: "Sameer", role: "Volunteer", file: "sameer" },
  { name: "Raza Sheikh", role: "Volunteer", file: "raza-sheikh" },
  { name: "Mudasir", role: "Volunteer", file: "mudasir" },
  { name: "Hafsa", role: "Volunteer", file: "hafsa" },
  { name: "Aqsa Fatima", role: "Volunteer", file: "aqsa-fatima" },
];

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
}

function MemberCard({ member }: { member: Member }) {
  const [ok, setOk] = useState(true);
  const featured = Boolean(member.featured);

  return (
    <article
      className={`team-card group relative flex overflow-hidden rounded-[1.6rem] bg-[#0c1626] transition-all duration-500 ease-out hover:-translate-y-2.5 ${
        featured
          ? "h-[13.5rem] w-[16.5rem] shadow-[0_20px_50px_-15px_rgba(14,165,233,0.45)] ring-2 ring-cyan-400/80 hover:shadow-[0_25px_60px_-12px_rgba(14,165,233,0.6)] sm:h-[15.5rem] sm:w-[19rem]"
          : "h-[11.8rem] w-[14rem] shadow-[0_15px_35px_-15px_rgba(15,23,42,0.6)] ring-1 ring-blue-500/25 hover:shadow-[0_22px_45px_-12px_rgba(37,99,235,0.4)] hover:ring-blue-400/60 sm:h-[13.2rem] sm:w-[15.8rem]"
      }`}
    >
      {/* 1. Modern Left Vertical Ribbon */}
      <div
        className={`relative flex w-10 shrink-0 items-center justify-center border-r border-white/10 sm:w-11 ${
          featured
            ? "bg-gradient-to-b from-blue-600 via-cyan-600 to-blue-700"
            : "bg-gradient-to-b from-[#0b63ce] via-[#0d5ac4] to-[#094294]"
        }`}
      >
        <span className="rotate-180 select-none font-black uppercase leading-none tracking-[0.22em] text-white [writing-mode:vertical-rl] text-[9.5px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] sm:text-[10.5px]">
          {member.role}
        </span>
      </div>

      {/* 2. Photo & Visual Display */}
      <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-[#132238] to-[#070e1a]">
        {/* Top Editorial Magazine Watermark */}
        <div className="pointer-events-none absolute inset-x-0 top-3 z-20 px-2 text-center">
          <h3 className="font-serif text-[15px] font-semibold uppercase tracking-[0.2em] text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)] sm:text-[17px]">
            {member.role}
          </h3>
          <div className="mx-auto mt-1 h-[1px] w-12 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>

        {/* Member Photo with Smooth Cinematic Zoom */}
        {ok ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/team/${member.file}.jpg`}
            alt={member.name}
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
            onError={() => setOk(false)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#12284c] to-[#091426]">
            <span className="font-display text-4xl font-extrabold tracking-wider text-cyan-300/80">
              {initials(member.name)}
            </span>
          </div>
        )}

        {/* Subtle Ambient Vignettes for Contrast */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/70 via-black/30 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />

        {/* Diagonal Sheen Shimmer Effect on Hover */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full z-20" />

        {/* 3. Modern 3D Ribbon Name Badge at Bottom */}
        <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center drop-shadow-[0_6px_16px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-105">
          {/* Folded 3D Ribbon Icon Notch */}
          <div className="flex h-7 items-center justify-center rounded-l-md bg-gradient-to-br from-blue-500 to-cyan-500 px-2 shadow-inner">
            <svg
              className="h-3.5 w-3.5 fill-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
              viewBox="0 0 24 24"
            >
              <path d="M5 3h14a2 2 0 0 1 2 2v16l-9-4-9 4V5a2 2 0 0 1 2-2z" />
            </svg>
          </div>

          {/* Name Banner with High-End Glassmorphic Gradient */}
          <div className="flex h-7 items-center justify-center whitespace-nowrap rounded-r-md border-y border-r border-white/20 bg-gradient-to-r from-[#0d5ac4] via-[#094bb3] to-[#073a91] px-3 shadow-[0_4px_12px_rgba(13,90,196,0.5)] backdrop-blur-md">
            <span className="text-[10px] font-black uppercase tracking-[0.14em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] sm:text-[11px]">
              {member.name}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function Branch() {
  return (
    <div className="flex flex-col items-center py-2.5">
      <div className="team-line h-4 w-[2px] bg-gradient-to-b from-blue-500 to-blue-300/40" />
      <div className="team-rail h-[2px] w-full max-w-5xl bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
      <div className="team-line h-4 w-[2px] bg-gradient-to-b from-blue-300/40 to-blue-500" />
    </div>
  );
}

export default function Team() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".team-title",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".team-title", start: "top 88%" },
        }
      );
      gsap.fromTo(
        ".team-card",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: ".team-org", start: "top 82%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="team" className="relative overflow-hidden bg-[#f0f6ff] py-16 sm:py-24">
      {/* Background Decorative Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/15 blur-[120px]" />
        <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-cyan-400/15 blur-[100px]" />
        <div className="absolute top-1/2 right-10 h-80 w-80 rounded-full bg-indigo-400/10 blur-[110px]" />
      </div>

      <div className="page-gutter relative mx-auto max-w-[96rem]">
        {/* Section Header */}
        <div className="team-title mb-12 text-center sm:mb-16">
          <p className="mb-3 inline-block rounded-full bg-blue-100/80 px-4 py-1 text-xs font-bold uppercase tracking-[0.35em] text-blue-700 shadow-sm backdrop-blur-sm">
            The people behind the week
          </p>
          <h2 className="font-display text-4xl font-extrabold uppercase tracking-[0.08em] text-[#071739] sm:text-6xl">
            Executive <span className="electric-text">Committee</span>
          </h2>
          <div className="section-rule mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600" />
          <p className="mx-auto mt-4 max-w-xl text-sm font-medium text-slate-500 sm:text-base">
            President on the crest. Coordinators on the floor. One crew running PlayFest &apos;26.
          </p>
        </div>

        {/* Committee Tree */}
        <div className="team-org">
          {/* Row 1: Vice President - President - Vice President */}
          <div className="flex flex-wrap items-end justify-center gap-4 sm:gap-7">
            {TOP.map((m) => (
              <MemberCard key={`${m.role}-${m.name}`} member={m} />
            ))}
          </div>

          <Branch />

          {/* Row 2: 6 Coordinators */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            {MID.map((m) => (
              <MemberCard key={`${m.role}-${m.name}`} member={m} />
            ))}
          </div>

          <Branch />

          {/* Row 3: 5 Volunteers */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            {BOTTOM.map((m) => (
              <MemberCard key={`${m.role}-${m.name}`} member={m} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}