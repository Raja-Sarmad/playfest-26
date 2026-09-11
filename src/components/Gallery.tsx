"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHOTOS = [
  { label: "Opening Night", sub: "Flags, anthem, first whistle", num: "01", tone: "from-blue-500/50 via-navy-800 to-navy-950" },
  { label: "Main Ground", sub: "Football under the floodlights", num: "02", tone: "from-navy-600/70 via-navy-900 to-navy-950" },
  { label: "Cricket Final", sub: "Last over. Packed stands.", num: "03", tone: "from-gold-400/40 via-navy-900 to-navy-950" },
  { label: "Indoor Courts", sub: "Volleyball and basketball roar", num: "04", tone: "from-cyan-400/30 via-navy-900 to-navy-950" },
  { label: "Track Finals", sub: "Relays that emptied the benches", num: "05", tone: "from-blue-600/50 via-navy-900 to-navy-950" },
  { label: "Champions", sub: "Medal night at SZIC", num: "06", tone: "from-gold-400/50 via-navy-900 to-navy-950" },
];

export default function Gallery() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-title",
        { y: 28 },
        {
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".gallery-title", start: "top 88%" },
        }
      );

      gsap.utils.toArray<HTMLElement>(".gallery-card").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36 },
          {
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.to(".gallery-strip-move", {
        xPercent: -22,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="gallery" className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="page-gutter relative mx-auto max-w-7xl">
        <div className="gallery-title mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-blue-600">
            Highlights
          </p>
          <h2 className="font-display text-4xl font-bold uppercase text-navy-900 sm:text-5xl">
            From the <span className="electric-text">Grounds</span>
          </h2>
          <div className="section-rule mx-auto mt-4 h-px w-44" />
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Last year&apos;s energy, this year&apos;s stage. Tag{" "}
            <span className="font-semibold text-blue-600">#SZICPlayFest</span> and
            make the PlayFest &apos;26 album.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PHOTOS.map((p) => (
            <div
              key={p.num}
              className="gallery-card group relative h-72 overflow-hidden rounded-2xl border border-blue-100 shadow-[0_12px_32px_-18px_rgba(10,31,66,0.22)] transition-all duration-500 hover:border-blue-400/50"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.tone}`} />
              <div className="grid-bg absolute inset-0 opacity-25" />
              <div className="absolute left-5 top-5 z-10 font-display text-5xl font-bold text-white/15 transition-colors group-hover:text-blue-400/35">
                {p.num}
              </div>
              <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent p-6 pt-16">
                <h3 className="font-display text-xl font-bold uppercase text-white">
                  {p.label}
                </h3>
                <p className="text-sm text-blue-300">{p.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-blue-100 bg-ice py-5">
          <div className="gallery-strip-move flex w-[400%] items-center gap-6 whitespace-nowrap">
            {[
              "PLAY",
              "PERFORM",
              "CELEBRATE",
              "#SZICPLAYFEST",
              "SEE YOU ON THE GROUND",
              "PLAY",
              "PERFORM",
              "CELEBRATE",
            ].map((t, i) => (
              <span
                key={`${t}-${i}`}
                className="font-display text-2xl font-bold uppercase tracking-wider text-slate-400"
              >
                {t} <span className="ml-6 text-gold-400">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
