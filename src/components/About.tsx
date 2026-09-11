"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    title: "Play",
    desc: "Twelve sports. Full fixtures. Real rivalries between Karachi campuses.",
  },
  {
    title: "Perform",
    desc: "Opening night, half-time shows, and a closing ceremony the city will talk about.",
  },
  {
    title: "Celebrate",
    desc: "Medals, trophies, campus pride, and a week that feels bigger than the scoreboard.",
  },
];

export default function About() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-title",
        { y: 24 },
        {
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-title", start: "top 88%" },
        }
      );
      gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28 },
          {
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          }
        );
      });
      const counters = gsap.utils.toArray<HTMLElement>(".about-counter");
      counters.forEach((el) => {
        const target = parseInt(el.dataset.target || "0", 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power1.inOut",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.val));
          },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="about" className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="page-gutter relative mx-auto max-w-7xl">
        <div className="about-title mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-blue-600">
            The Festival
          </p>
          <h2 className="font-display text-4xl font-bold uppercase text-navy-900 sm:text-5xl">
            What is <span className="electric-text">PlayFest?</span>
          </h2>
          <div className="section-rule mx-auto mt-4 h-px w-44" />
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-5">
            <p className="about-reveal text-base leading-relaxed text-slate-600 md:text-lg">
              <span className="font-semibold text-navy-900">SZIC PlayFest &apos;26</span>{" "}
              is the student-run sports week that turns campus into a stadium.
              Universities from across Karachi arrive for seven days of
              fixtures, performances, and a closing night built for champions.
            </p>
            <p className="about-reveal text-base leading-relaxed text-slate-600 md:text-lg">
              Whether you play for the badge, perform on the main stage, or
              fill the stands in your campus colours — this week is for the
              whole city.
            </p>

            <div className="grid gap-4 pt-1 sm:grid-cols-3">
              {PILLARS.map((item) => (
                <div
                  key={item.title}
                  className="about-reveal surface-card rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="mb-3 h-1 w-8 rounded-full bg-gradient-to-r from-blue-500 to-gold-400" />
                  <h3 className="font-display text-lg font-bold uppercase text-blue-600">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="about-reveal relative">
            <div className="surface-card relative overflow-hidden rounded-[1.4rem] p-6 sm:p-8">
              <div className="mx-auto h-28 w-28 overflow-hidden rounded-2xl bg-navy-950">
                <Image
                  src="/playfestlogo.png"
                  alt="PlayFest '26 emblem"
                  width={112}
                  height={112}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="font-display relative mt-4 text-center text-3xl font-bold uppercase text-navy-900">
                PlayFest
                <span className="year-sup ml-1 align-super text-xl">&apos;26</span>
              </h3>
              <p className="mt-1 text-center text-sm tracking-[0.22em] text-blue-600">
                16 — 22 MARCH · SZIC KARACHI
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { v: 7, l: "Days" },
                  { v: 12, l: "Sports" },
                  { v: 24, l: "Finals" },
                ].map((c) => (
                  <div key={c.l} className="rounded-xl bg-ice p-3 text-center">
                    <div className="font-display text-2xl font-bold text-blue-600">
                      <span className="about-counter" data-target={c.v}>
                        0
                      </span>
                    </div>
                    <div className="mt-0.5 text-[11px] uppercase tracking-wider text-slate-500">
                      {c.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
