"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GAMES = [
  "PUBG",
  "Free Fire",
  "Cricket",
  "Badminton",
  "Hackathon",
  "Logo Designing",
  "Chess",
  "Tug of War",
  "Treasure Hunt",
];

const SARMAD_WA = "923262176836";

const DESK = [
  {
    name: "Sarmad Masood",
    phone: "0326 2176836",
    href: `https://wa.me/${SARMAD_WA}`,
    action: "WhatsApp",
  },
  {
    name: "Ammar Khan",
    phone: "0322 0212776",
    href: "tel:03220212776",
    action: "Call",
  },
];

const ROLES: Record<string, string> = {
  player: "Competing",
  spectator: "Spectator",
  volunteer: "Volunteer",
  sponsor: "Sponsor",
};

const field =
  "w-full rounded-xl border border-cyan-300/20 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-cyan-300/70 focus:bg-white/10";

const selectField = `${field} reg-select`;

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-title",
        { y: 28 },
        {
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-title", start: "top 88%" },
        }
      );
      gsap.fromTo(
        ".contact-left",
        { y: 24 },
        {
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-grid", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".contact-form-wrap",
        { y: 28 },
        {
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-grid", start: "top 75%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const sendToWhatsApp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const campus = String(data.get("campus") || "").trim();
    const contact = String(data.get("contact") || "").trim();
    const role = ROLES[String(data.get("role") || "player")] || "Competing";
    const game = String(data.get("game") || "").trim();
    const note = String(data.get("note") || "").trim();

    const lines = [
      "PlayFest '26 registration",
      "",
      `Name: ${name}`,
      `Campus: ${campus}`,
      `Contact: ${contact}`,
      `I am: ${role}`,
      `Game: ${game}`,
    ];
    if (note) lines.push(`Team / message: ${note}`);

    const url = `https://wa.me/${SARMAD_WA}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <section
      ref={rootRef}
      id="contact"
      className="relative overflow-hidden bg-[#020817] py-16 sm:py-20"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="grid-bg absolute inset-0 opacity-20" />
      </div>

      <div className="page-gutter relative mx-auto max-w-7xl">
        <div className="contact-title mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-cyan-300">
            Registration
          </p>
          <h2 className="font-display text-4xl font-bold uppercase text-white sm:text-6xl">
            Lock your <span className="hero-neon">slot</span>
          </h2>
          <div className="section-rule mx-auto mt-4 h-px w-44" />
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Early bird on every game. Play · Perform · Celebrate. Last week of
            September at SZIC.
          </p>
        </div>

        <div className="contact-grid grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <div className="contact-left flex flex-col gap-4">
            <div className="game-card nav-cta p-6 sm:p-7">
              <p className="text-[10px] font-black uppercase tracking-[0.32em] text-cyan-300">
                Early bird
              </p>
              <h3 className="font-display mt-2 text-3xl font-bold uppercase text-white">
                Discount on all nine games
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Fill the form or call the desk. Outsiders allowed — bring your
                squad.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-cyan-300/20 bg-white/5 px-3 py-3">
                  <p className="font-display text-lg font-bold text-cyan-300">Sept</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Last week
                  </p>
                </div>
                <div className="rounded-xl border border-cyan-300/20 bg-white/5 px-3 py-3">
                  <p className="font-display text-lg font-bold text-cyan-300">Open</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    For all
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {DESK.map((person) => (
                <a
                  key={person.name}
                  href={person.href}
                  target={person.href.startsWith("http") ? "_blank" : undefined}
                  rel={person.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="rounded-2xl border border-cyan-300/20 bg-white/5 p-5 transition-all hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/10"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">
                    {person.action}
                  </p>
                  <p className="font-display mt-2 text-lg font-bold uppercase text-white">
                    {person.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-300">{person.phone}</p>
                </a>
              ))}
            </div>

            <div className="rounded-2xl border border-cyan-300/20 bg-white/5 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">
                Venue
              </p>
              <p className="mt-2 font-display text-lg font-bold uppercase text-white">
                Sheikh Zayed Islamic Center
              </p>
              <p className="mt-1 text-sm text-slate-300">
                University of Karachi
              </p>
            </div>
          </div>

          <div className="contact-form-wrap">
            <div className="relative overflow-hidden rounded-[1.6rem] border border-cyan-300/25 bg-[#06101f]/80 p-6 shadow-[0_24px_60px_-28px_rgba(58,214,255,0.35)] sm:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300">
                Entry form
              </p>
              <h3 className="font-display mt-2 text-2xl font-bold uppercase text-white sm:text-3xl">
                Team / player registration
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Submit opens WhatsApp to Sarmad with your details.
              </p>

              <form className="mt-6 space-y-4" onSubmit={sendToWhatsApp}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                      Full name
                    </span>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className={field}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                      Campus
                    </span>
                    <input
                      name="campus"
                      type="text"
                      required
                      placeholder="University / campus"
                      className={field}
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    Email / phone
                  </span>
                  <input
                    name="contact"
                    type="text"
                    required
                    placeholder="How we reach you"
                    className={field}
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                      I am
                    </span>
                    <select name="role" defaultValue="player" className={selectField}>
                      <option value="player">Competing</option>
                      <option value="spectator">Spectator</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="sponsor">Sponsor</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                      Game
                    </span>
                    <select name="game" defaultValue="PUBG" className={selectField}>
                      {GAMES.map((game) => (
                        <option key={game} value={game}>
                          {game}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="block">
                  <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    Team / message
                  </span>
                  <textarea
                    name="note"
                    rows={3}
                    placeholder="Squad name or note (optional)"
                    className={`${field} resize-none`}
                  />
                </label>
                <button
                  type="submit"
                  className="btn-electric nav-cta w-full py-4 text-sm font-black uppercase tracking-widest"
                >
                  {sent ? "Opening WhatsApp" : "Send on WhatsApp"}
                </button>
                {sent && (
                  <p className="animate-fade-in text-center text-xs text-cyan-300">
                    WhatsApp opened for Sarmad. Send the message to lock your slot.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
