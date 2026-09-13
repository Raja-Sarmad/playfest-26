"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Member = {
  name: string;
  role: string;
  file: string;
  featured?: boolean;
};

const TOP: Member[] = [
  { name: "Muhammad Iltifat", role: "Vice President", file: "vp-1" },
  { name: "Hashmad Raza", role: "President", file: "president", featured: true },
  { name: "Hussain Malik", role: "Vice President", file: "vp-2" },
];

const MID: Member[] = [
  { name: "Sameer Farooqui", role: "Director Marketing", file: "marketing" },
  { name: "Mubeen Farid", role: "Director Computing", file: "computing" },
  { name: "Mohammad Abdul Ari", role: "Secretary", file: "secretary" },
  { name: "Mehreen Saghar", role: "General Secretary", file: "gs" },
  { name: "Bakhtawar Azhar", role: "Director Business", file: "business" },
  { name: "Hasan Iqbal", role: "Director Branding", file: "branding" },
];

const BOTTOM: Member[] = [
  { name: "Aisha Abid", role: "Director Guest Relations", file: "guest" },
  { name: "Hammad Ranara", role: "Director EE", file: "ee" },
  { name: "Shahmir Raza", role: "Treasurer", file: "treasurer" },
  { name: "Usman Nisar", role: "Event Administrator", file: "events" },
  { name: "Usman Yameen", role: "Corporate Affairs Lead", file: "corporate" },
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
      className={`team-card group relative flex overflow-hidden rounded-[1.2rem] bg-white transition-all duration-300 hover:-translate-y-1.5 ${
        featured
          ? "h-[10.5rem] w-[14rem] shadow-[0_18px_40px_-18px_rgba(212,160,23,0.45)] ring-2 ring-gold-400/70 sm:h-[12rem] sm:w-[16.5rem]"
          : "h-[8.2rem] w-[10.4rem] shadow-[0_12px_28px_-16px_rgba(10,31,66,0.28)] ring-1 ring-blue-100 hover:shadow-[0_18px_36px_-16px_rgba(10,143,255,0.35)] hover:ring-blue-400/40 sm:h-[9rem] sm:w-[11.2rem]"
      }`}
    >
      <div
        className={`flex shrink-0 items-center justify-center ${
          featured
            ? "w-10 bg-gradient-to-b from-gold-400 to-gold-500 sm:w-11"
            : "w-8 bg-gradient-to-b from-blue-500 to-blue-600 sm:w-9"
        }`}
      >
        <span
          className={`rotate-180 font-black uppercase leading-none tracking-[0.14em] text-white [writing-mode:vertical-rl] ${
            featured ? "text-[9px] sm:text-[10px]" : "text-[8px] sm:text-[9px]"
          }`}
        >
          {member.role}
        </span>
      </div>
      <div className="relative flex-1 bg-[#dceaf8]">
        {ok ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/team/${member.file}.jpg`}
            alt={member.name}
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            onError={() => setOk(false)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#12305f] to-[#071428]">
            <span className="font-display text-3xl font-bold text-cyan-200/90">
              {initials(member.name)}
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071428] via-[#071428]/70 to-transparent px-2 pb-2 pt-10">
          <div className="flex items-center gap-1.5">
            <Image
              src="/playfestlogo.png"
              alt=""
              width={18}
              height={18}
              className="h-4 w-4 rounded-sm object-cover ring-1 ring-white/30"
            />
            <p
              className={`truncate font-bold uppercase tracking-wider text-white ${
                featured ? "text-[11px] sm:text-xs" : "text-[9px] sm:text-[10px]"
              }`}
            >
              {member.name}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function Branch() {
  return (
    <div className="flex flex-col items-center py-1">
      <div className="team-line" />
      <div className="team-rail w-full max-w-5xl" />
      <div className="team-line" />
    </div>
  );
}

export default function Team() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".team-title",
        { y: 28 },
        {
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".team-title", start: "top 88%" },
        }
      );
      gsap.fromTo(
        ".team-card",
        { y: 28 },
        {
          y: 0,
          duration: 0.55,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: ".team-org", start: "top 82%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="team" className="relative overflow-hidden bg-[#f3f8ff] py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-400/15 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-56 w-56 rounded-full bg-gold-400/10 blur-3xl" />
      </div>

      <div className="page-gutter relative mx-auto max-w-[92rem]">
        <div className="team-title mb-10 text-center sm:mb-14">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-blue-600">
            The people behind the week
          </p>
          <h2 className="font-display text-4xl font-bold uppercase tracking-[0.1em] text-navy-900 sm:text-6xl">
            Executive <span className="electric-text">Committee</span>
          </h2>
          <div className="section-rule mx-auto mt-4 h-px w-52" />
          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-500">
            President on the crest. Directors on the floor. One crew running
            PlayFest &apos;26.
          </p>
        </div>

        <div className="team-org">
          <div className="flex flex-wrap items-end justify-center gap-3 sm:gap-5">
            {TOP.map((m) => (
              <MemberCard key={`${m.role}-${m.name}`} member={m} />
            ))}
          </div>

          <Branch />

          <div className="flex flex-wrap items-center justify-center gap-2 lg:flex-nowrap lg:gap-2.5">
            {MID.map((m) => (
              <MemberCard key={`${m.role}-${m.name}`} member={m} />
            ))}
          </div>

          <Branch />

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {BOTTOM.map((m) => (
              <MemberCard key={`${m.role}-${m.name}`} member={m} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
