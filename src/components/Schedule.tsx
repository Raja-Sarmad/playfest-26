"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DAYS = [
  {
    day: "Day 01",
    date: "Mon 16 Mar",
    title: "Kickoff",
    items: ["Opening ceremony · 9:00 AM", "Football group stage", "Athletics heats"],
  },
  {
    day: "Day 02",
    date: "Tue 17 Mar",
    title: "Derby Day",
    items: ["Cricket league matches", "Basketball prelims", "Table tennis round robin"],
  },
  {
    day: "Day 03",
    date: "Wed 18 Mar",
    title: "Court Week",
    items: ["Volleyball quarters", "Tennis singles", "Badminton doubles"],
  },
  {
    day: "Day 04",
    date: "Thu 19 Mar",
    title: "Knockouts",
    items: ["Football quarters", "Cricket Super 4s", "Indoor finals warm-up"],
  },
  {
    day: "Day 05",
    date: "Fri 20 Mar",
    title: "Semi-Finals",
    items: ["Football & cricket semis", "Basketball final four", "Track finals"],
  },
  {
    day: "Day 06",
    date: "Sat 21 Mar",
    title: "Finals Eve",
    items: ["Court sport medals", "Campus cultural night", "Player parade"],
  },
  {
    day: "Day 07",
    date: "Sun 22 Mar",
    title: "Champions",
    items: ["Football & cricket finals", "Medal ceremony", "Closing celebration"],
  },
];

export default function Schedule() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".schedule-title",
        { y: 32 },
        {
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".schedule-title", start: "top 88%" },
        }
      );
      gsap.utils.toArray<HTMLElement>(".schedule-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 28 },
          {
            y: 0,
            duration: 0.65,
            delay: i * 0.04,
            ease: "power3.out",
            scrollTrigger: { trigger: ".schedule-grid", start: "top 82%" },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="schedule" className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="page-gutter relative mx-auto max-w-7xl">
        <div className="schedule-title mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-blue-600">
            Fixtures Week
          </p>
          <h2 className="font-display text-4xl font-bold uppercase text-navy-900 sm:text-5xl">
            Match <span className="electric-text">Schedule</span>
          </h2>
          <div className="section-rule mx-auto mt-4 h-px w-44" />
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Seven days from the first whistle to the trophy lift. Kick-off
            times land on the live board the morning of each fixture.
          </p>
        </div>

        <div className="schedule-grid grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {DAYS.map((d) => (
            <article
              key={d.day}
              className="schedule-card group rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_10px_30px_-18px_rgba(10,31,66,0.16)] transition-all duration-500 hover:-translate-y-1 hover:border-blue-400/50"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-bold uppercase tracking-widest text-gold-500">
                  {d.day}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-slate-500">
                  {d.date}
                </span>
              </div>
              <h3 className="font-display mt-3 text-2xl font-bold uppercase text-navy-900 group-hover:text-blue-600">
                {d.title}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {d.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}

          <article className="schedule-card flex flex-col justify-center rounded-2xl border border-dashed border-blue-300 bg-ice p-6 text-center">
            <p className="font-display text-lg font-bold uppercase text-blue-600">
              Live fixture board
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Grounds, courts, and gate times posted daily at the SZIC sports
              desk.
            </p>
            <a
              href="#contact"
              className="btn-outline-electric mt-5 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs font-black uppercase tracking-widest"
            >
              Ask the desk
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
