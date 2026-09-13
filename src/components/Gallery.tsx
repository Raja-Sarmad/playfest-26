"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SHOTS = [
  { file: "01", label: "Opening", span: "lg:col-span-2 lg:row-span-2 min-h-[18rem] lg:min-h-[32rem]" },
  { file: "02", label: "Crowd", span: "min-h-[16rem]" },
  { file: "03", label: "Esports", span: "min-h-[16rem]" },
  { file: "04", label: "Ground", span: "min-h-[16rem]" },
  { file: "05", label: "Courts", span: "min-h-[16rem]" },
  { file: "06", label: "Campus", span: "min-h-[16rem]" },
  { file: "07", label: "Squads", span: "min-h-[16rem]" },
  { file: "08", label: "Champions", span: "lg:col-span-2 min-h-[16rem]" },
  { file: "09", label: "Night", span: "min-h-[16rem]" },
  { file: "10", label: "Stalls", span: "min-h-[16rem]" },
  { file: "11", label: "Finals", span: "min-h-[16rem]" },
  { file: "12", label: "Stage", span: "min-h-[16rem]" },
  { file: "13", label: "Team", span: "min-h-[16rem]" },
  { file: "14", label: "Medals", span: "min-h-[16rem]" },
  { file: "15", label: "Energy", span: "min-h-[16rem]" },
  { file: "16", label: "Close", span: "lg:col-span-2 min-h-[16rem]" },
];

const PREVIEW = 8;

function Shot({
  file,
  label,
  onOpen,
}: {
  file: string;
  label: string;
  onOpen: () => void;
}) {
  const [ok, setOk] = useState(true);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="absolute inset-0"
      aria-label={`Open ${label}`}
    >
      {ok ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/gallery/${file}.jpg`}
          alt={label}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={() => setOk(false)}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center bg-[#071428]">
          <span className="font-display text-5xl font-bold text-white/10">{file}</span>
          <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-300/70">
            Drop {file}.jpg
          </span>
        </div>
      )}
    </button>
  );
}

export default function Gallery() {
  const rootRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [more, setMore] = useState(false);
  const extraRef = useRef<HTMLDivElement>(null);

  const visible = more ? SHOTS : SHOTS.slice(0, PREVIEW);

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
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % SHOTS.length));
      if (e.key === "ArrowLeft")
        setOpen((i) => (i === null ? i : (i - 1 + SHOTS.length) % SHOTS.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const shot = open !== null ? SHOTS[open] : null;

  return (
    <section
      ref={rootRef}
      id="gallery"
      className="relative overflow-hidden bg-[#020817] py-16 sm:py-20"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-blue-600/15 blur-3xl" />
      </div>

      <div className="page-gutter relative mx-auto max-w-7xl">
        <div className="gallery-title mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-cyan-300">
            Last year
          </p>
          <h2 className="font-display text-4xl font-bold uppercase text-white sm:text-6xl">
            PlayFest <span className="hero-neon">flashback</span>
          </h2>
          <div className="section-rule mx-auto mt-4 h-px w-44" />
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Last year&apos;s album. Click a frame. This year, you&apos;re in it.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((item, i) => (
            <article
              key={item.file}
              className={`gallery-card group relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#071428] ${item.span}`}
            >
              <Shot file={item.file} label={item.label} onOpen={() => setOpen(i)} />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#020817] via-[#020817]/40 to-transparent p-4 pt-14 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-300">
                  Last year
                </p>
                <p className="font-display text-lg font-bold uppercase text-white">
                  {item.label}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div ref={extraRef} className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => {
              setMore((v) => {
                const next = !v;
                if (!v) {
                  requestAnimationFrame(() => {
                    extraRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                  });
                }
                return next;
              });
            }}
            className="btn-electric nav-cta px-8 py-3 text-xs font-black uppercase tracking-widest"
          >
            {more ? "Show less" : `More photos · ${SHOTS.length - PREVIEW}+`}
          </button>
        </div>
      </div>

      {shot && open !== null && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#020817]/90 p-4 backdrop-blur-md"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(null)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/35 text-2xl text-white hover:bg-white/10"
          >
            ×
          </button>
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((open - 1 + SHOTS.length) % SHOTS.length);
            }}
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/35 text-white hover:bg-white/10 sm:left-6"
          >
            ‹
          </button>
          <figure
            className="relative max-h-[82vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/gallery/${shot.file}.jpg`}
              alt={shot.label}
              className="max-h-[82vh] w-full rounded-2xl object-contain"
            />
            <figcaption className="mt-3 text-center text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">
              {shot.file} · {shot.label}
            </figcaption>
          </figure>
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((open + 1) % SHOTS.length);
            }}
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/35 text-white hover:bg-white/10 sm:right-6"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
