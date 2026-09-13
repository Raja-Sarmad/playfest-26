"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Game = {
  name: string;
  tag: string;
  lane: "Esports" | "Sports" | "Create" | "Campus";
  num: string;
  desc: string;
  glow: string;
  about: string;
  format: string;
  early: string;
  regular: string;
  prize?: string;
  note: string;
  rules: string[];
};

const GAMES: Game[] = [
  {
    name: "PUBG",
    tag: "Esports",
    lane: "Esports",
    num: "01",
    desc: "Squad drop. Last circle. Chicken dinner or nothing.",
    glow: "#3ad6ff",
    about:
      "Squad-mode campus cup. Four-player teams drop, loot, rotate, and survive the last circle. Custom rooms, live bracket, and a watch-party floor.",
    format: "Squad of 4 · Custom rooms · Knockout + finals",
    early: "Rs 2,000 / squad",
    regular: "Rs 2,500 / squad",
    prize: "Rs 25,000 prize pool",
    note: "Early bird knocks Rs 500 off. Pay at the desk after WhatsApp registration.",
    rules: [
      "Team of exactly 4. All players must register before the first room.",
      "Only official / allowed devices and accounts. No emulators unless the desk announces otherwise.",
      "No teaming with other squads, ghosting, or sharing circle info.",
      "Hacks, scripts, or third-party tools = instant DQ. No refund.",
      "Be in the lobby 10 minutes before room ID is shared.",
      "Disconnects are not replayed unless the whole room crashes.",
      "Prize pool is Rs 25,000. Split is announced at the desk before finals.",
      "Referee / admin decision is final.",
    ],
  },
  {
    name: "Free Fire",
    tag: "Esports",
    lane: "Esports",
    num: "02",
    desc: "Fast rounds. Clutch finishes. Campus bragging rights.",
    glow: "#2eb4ff",
    about:
      "Fast BR rounds for campus squads. Short games, loud floor, and a clean bracket to the final custom.",
    format: "Squad of 4 · Custom rooms · Points + knockout",
    early: "Rs 2,000 / squad",
    regular: "Rs 2,500 / squad",
    prize: "Rs 25,000 prize pool",
    note: "Same pricing as PUBG. Early bird knocks Rs 500 off.",
    rules: [
      "Team of exactly 4. Same four names on every match.",
      "No guest / unregistered fifth player in voice or lobby.",
      "No teaming, ghosting, or stream sniping.",
      "Hacks or modified clients = DQ. No refund.",
      "Join the room within 8 minutes of ID/password.",
      "Admin can replay a round only if the custom room fails.",
      "Prize pool is Rs 25,000. Split is announced at the desk before finals.",
      "Desk decision is final.",
    ],
  },
  {
    name: "Cricket",
    tag: "Sports",
    lane: "Sports",
    num: "03",
    desc: "Tape ball. 5 overs. Boys and girls play separate.",
    glow: "#e8b63a",
    about:
      "Tape-ball cricket at SZIC. Five overs a side. Boys and girls play in separate tournaments — own trophy, own bracket.",
    format: "5 overs · Tape ball · Boys & girls separate",
    early: "Rs 2,500 / team",
    regular: "Rs 2,500 / team",
    note: "SZIC students only. Bring your student card to the toss.",
    rules: [
      "Only SZIC students. Student ID is checked at registration and before the toss.",
      "Boys and girls play in two separate tournaments. No mixed sides.",
      "Tape ball only. Five overs per innings unless umpires reduce for light or rain.",
      "Standard tape-ball extras: wides and no-balls are re-bowled with a run.",
      "Sports shoes on the ground. No metal spikes.",
      "Late by more than 10 minutes after toss time = forfeit.",
      "No abuse of umpires, scorers, or the other side.",
      "Umpire decision is final. No video review.",
    ],
  },
  {
    name: "Badminton",
    tag: "Sports",
    lane: "Sports",
    num: "04",
    desc: "Men's, women's, and mixed doubles. Best of 3.",
    glow: "#5ec8ff",
    about:
      "Doubles-only draw at SZIC: men's doubles, women's doubles, and mixed doubles. Every match is best of 3.",
    format: "MD · WD · XD · Best of 3",
    early: "Rs 500 / pair",
    regular: "Rs 600 / pair",
    note: "SZIC students only. Bring your student card to the court.",
    rules: [
      "Only SZIC students. Student ID is checked before the first match.",
      "Three events only: men's doubles, women's doubles, and mixed doubles. No singles.",
      "Register in one event. Pair names are locked after the draw.",
      "Every match is best of 3 games. BWF scoring: 21 points, win by 2, cap at 30.",
      "Bring your own racket. Shuttles are provided for match play.",
      "Non-marking court shoes only.",
      "5-minute walkover if you are not on court after the call.",
      "No coaching from the sidelines during a rally.",
      "Referee call on the line is final.",
    ],
  },
  {
    name: "Hackathon",
    tag: "Tech",
    lane: "Create",
    num: "05",
    desc: "Build under pressure. Pitch. Win the build-off.",
    glow: "#7ae0ff",
    about:
      "A timed build-off at SZIC. Brief drops on the day. Teams ship a working demo and pitch to judges. Laptops, caffeine, and a hard deadline.",
    format: "Team of 4 · Timed build + 5-min pitch",
    early: "Rs 1,500 / team",
    regular: "Rs 1,500 / team",
    note: "Logo Designing is a separate event with its own fee.",
    rules: [
      "Team of exactly 4. Solo or three-person entries are not accepted.",
      "Code and design must be built during the event window.",
      "You may use public libraries and APIs. No submitting an old finished product.",
      "Theme / brief is announced at kickoff. Keep it on-brief.",
      "Pitch is 5 minutes + 2 minutes Q&A. Over time is cut.",
      "Judges score idea, build, and presentation. Their scores stand.",
      "Keep it respectful. No scraped private data, no harmful tools.",
    ],
  },
  {
    name: "Logo Designing",
    tag: "Creative",
    lane: "Create",
    num: "06",
    desc: "Design the mark. Best identity takes the crown.",
    glow: "#e8b63a",
    about:
      "A live identity brief. Design a mark, lockup, and one usage board. Judges look for idea, craft, and how well it fits PlayFest energy.",
    format: "Solo · Live brief · Digital submission",
    early: "Rs 500 / person",
    regular: "Rs 600 / person",
    note: "Separate from the Hackathon. Individual entry only.",
    rules: [
      "Individual only. No pair or agency entries.",
      "Work must be original and made in the contest window.",
      "No AI-only submissions. You may use AI as a sketch tool, but the final mark is yours.",
      "Submit PNG/PDF plus source file as the desk asks.",
      "PlayFest may showcase winning work with credit. You keep your copyright.",
      "Off-brief or copied work is DQ. No refund.",
      "Judges’ decision is final.",
    ],
  },
  {
    name: "Chess",
    tag: "Mind",
    lane: "Create",
    num: "07",
    desc: "Slow hands. Sharp minds. Checkmate or go home.",
    glow: "#d4e8ff",
    about:
      "Swiss or knockout over the board. Clocks on, touch-move on, quiet room. Bring your best openings.",
    format: "Individual · Rapid (10+5) · Swiss / knockout",
    early: "Rs 300 / person",
    regular: "Rs 500 / person",
    note: "Early bird is live for one week. Pay at the desk after WhatsApp registration.",
    rules: [
      "FIDE touch-move. If you touch a piece, you move it if legal.",
      "Default time control: 10 minutes + 5 seconds increment unless posted otherwise.",
      "Phones off or on the arbiter’s table during a game.",
      "No talking, hints, or engine help. Instant DQ.",
      "Arrive 10 minutes early. 10-minute forfeit after start.",
      "Illegal move: arbiter adds 2 minutes to the opponent, then DQ on repeat.",
      "Arbiter decision is final.",
    ],
  },
  {
    name: "Tug of War",
    tag: "Arena",
    lane: "Sports",
    num: "08",
    desc: "One rope. Two sides. Pure squad power.",
    glow: "#0a8fff",
    about:
      "Classic rope pull on the arena patch. Five on the rope, marked line, loud crowd. Count is checked before every pull.",
    format: "Team of 5 · Best of 3 pulls",
    early: "Rs 1,000 / team",
    regular: "Rs 1,200 / team",
    note: "Early bird is Rs 1,000. Regular is Rs 1,200 before the discount week ends.",
    rules: [
      "Team of exactly 5. All five names are locked at registration.",
      "Sports shoes only. No spikes, resin, or sticky gloves.",
      "No sitting, wrapping the rope around the body, or sudden jerks the ref calls dangerous.",
      "First team to pull the mark across the line wins the pull. Best of 3.",
      "Abuse or leaving the lane = warning, then DQ.",
      "Headcount can be checked before any pull.",
      "Referee decision is final.",
    ],
  },
  {
    name: "Treasure Hunt",
    tag: "Campus",
    lane: "Campus",
    num: "09",
    desc: "Clues across SZIC. First squad to the prize wins.",
    glow: "#3ad6ff",
    about:
      "Clues drop across Sheikh Zayed Islamic Center. Teams run, solve, and check in. First squad to the last stamp wins — no cars, no shortcuts through closed areas.",
    format: "Team of 5 · Timed campus route",
    early: "Rs 1,000 / team",
    regular: "Rs 1,200 / team",
    note: "Same pricing as Tug of War. Early bird Rs 1,000, regular Rs 1,200.",
    rules: [
      "Team of exactly 5. Stay together at every check-in.",
      "Stay on campus and in marked zones. No entering offices, labs, or prayer spaces mid-hunt.",
      "No vehicles, bikes, or scooters.",
      "Do not damage property or hide clues from other teams.",
      "Phones are allowed for maps and photos. No asking staff for answers.",
      "Miss a stamp and you cannot skip to the end.",
      "Marshals can DQ a team for unsafe or rude play. No refund.",
    ],
  },
];

const FILTERS = ["All", "Esports", "Sports", "Create", "Campus"] as const;

function GameModal({
  game,
  onClose,
}: {
  game: Game;
  onClose: () => void;
}) {
  const [step, setStep] = useState<1 | 2>(1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[85] flex items-center justify-center bg-[#020817]/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-cyan-300/35 bg-gradient-to-b from-[#06224a] to-[#020817] p-6 shadow-[0_0_80px_-20px_rgba(58,214,255,0.55)] sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/35 text-xl text-white hover:bg-white/10"
        >
          ×
        </button>

        <p className="text-[10px] font-black uppercase tracking-[0.32em] text-cyan-300">
          {game.num} · {game.tag}
        </p>
        <h3 className="font-display mt-2 pr-10 text-3xl font-bold uppercase text-white sm:text-5xl">
          {game.name}
        </h3>

        <div className="mt-4 flex gap-2">
          <span
            className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${
              step === 1 ? "bg-cyan-300 text-navy-900" : "border border-cyan-300/30 text-slate-400"
            }`}
          >
            1 · Charges
          </span>
          <span
            className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${
              step === 2 ? "bg-cyan-300 text-navy-900" : "border border-cyan-300/30 text-slate-400"
            }`}
          >
            2 · Rules
          </span>
        </div>

        {step === 1 ? (
          <div className="mt-6 space-y-5">
            <p className="text-base leading-relaxed text-slate-300">{game.about}</p>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
              {game.format}
            </p>
            {game.prize && (
              <div className="rounded-2xl border border-gold-400/40 bg-gold-400/10 px-5 py-4">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gold-400">
                  Prize pool
                </p>
                <p className="font-display mt-1 text-2xl font-bold text-white">{game.prize}</p>
              </div>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-cyan-300/25 bg-white/5 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">
                  Early bird
                </p>
                <p className="font-display mt-2 text-2xl font-bold text-white">{game.early}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Regular
                </p>
                <p className="font-display mt-2 text-2xl font-bold text-white">{game.regular}</p>
              </div>
            </div>
            <p className="text-sm text-slate-400">{game.note}</p>
          </div>
        ) : (
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {game.rules.map((rule) => (
              <li key={rule} className="flex gap-2 text-sm leading-relaxed text-slate-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                {rule}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex flex-row items-center gap-3">
          {step === 2 ? (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn-outline-electric nav-cta px-6 py-3 text-[11px] font-black uppercase tracking-widest"
            >
              Back
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setStep(2)}
              className="btn-electric nav-cta px-6 py-3 text-[11px] font-black uppercase tracking-widest"
            >
              Next · Rules
            </button>
          )}
          {step === 2 && (
            <a
              href="#contact"
              onClick={onClose}
              className="btn-electric nav-cta px-6 py-3 text-[11px] font-black uppercase tracking-widest"
            >
              Register
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Games() {
  const rootRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [active, setActive] = useState<Game | null>(null);

  const visible = GAMES.filter((g) => filter === "All" || g.lane === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sports-title",
        { y: 28 },
        {
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".sports-title", start: "top 88%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const cards = rootRef.current?.querySelectorAll<HTMLElement>(".sport-card");
    if (!cards?.length) return;
    gsap.fromTo(
      cards,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: "power3.out" }
    );
  }, [filter]);

  return (
    <section
      ref={rootRef}
      id="sports"
      className="relative overflow-hidden bg-[#020817] py-16 sm:py-20"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="grid-bg absolute inset-0 opacity-20" />
      </div>

      <div className="page-gutter relative mx-auto max-w-7xl">
        <div className="sports-title mb-8 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-cyan-300">
            Featured games
          </p>
          <h2 className="font-display text-4xl font-bold uppercase text-white sm:text-6xl">
            Only these <span className="hero-neon">nine</span>
          </h2>
          <div className="section-rule mx-auto mt-4 h-px w-44" />
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Tap a game for charges and rules. Early bird on every entry.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] transition-all ${
                filter === item
                  ? "btn-electric nav-cta text-white"
                  : "rounded-full border border-cyan-300/25 text-cyan-100 hover:border-cyan-300/60 hover:bg-white/5"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="sports-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((game) => (
            <article
              key={game.name}
              role="button"
              tabIndex={0}
              onClick={() => setActive(game)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(game);
                }
              }}
              className="sport-card game-card nav-cta min-h-[17rem] cursor-pointer p-6 text-left"
              style={{ "--game-glow": game.glow } as CSSProperties}
            >
              <div className="pointer-events-none absolute -right-6 -top-8 font-display text-8xl font-bold leading-none text-white/5">
                {game.num}
              </div>
              <div className="relative flex items-start justify-between gap-3">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300">
                  {game.tag}
                </p>
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: game.glow, boxShadow: `0 0 12px ${game.glow}` }}
                />
              </div>
              <h3 className="relative mt-8 font-display text-3xl font-bold uppercase text-white">
                {game.name}
              </h3>
              <p className="relative mt-3 max-w-xs text-sm leading-relaxed text-slate-300">
                {game.desc}
              </p>
              <span className="relative mt-6 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-cyan-300">
                Charges & rules
                <span aria-hidden>→</span>
              </span>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-[11px] font-bold uppercase tracking-[0.32em] text-slate-500">
          Stalls · Food · Merch · Outsiders welcome
        </p>
      </div>

      {active && <GameModal game={active} onClose={() => setActive(null)} />}
    </section>
  );
}
