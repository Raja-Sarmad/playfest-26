"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
      gsap.utils.toArray<HTMLElement>(".contact-left > *").forEach((el) => {
        gsap.fromTo(
          el,
          { x: -24 },
          {
            x: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: ".contact-grid", start: "top 80%" },
          }
        );
      });
      gsap.fromTo(
        ".contact-form-wrap",
        { y: 36 },
        {
          y: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-grid", start: "top 75%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const infos = [
    { title: "Venue", value: "SZIC Campus, Shahrah-e-Faisal, Karachi" },
    { title: "Festival week", value: "16–22 March · PlayFest '26 · Gates 8:30 AM" },
    { title: "Desk", value: "playfest@szic.edu.pk" },
    { title: "Hotline", value: "+92 300 1234567" },
  ];

  const socials = ["Instagram", "Facebook", "YouTube", "X"];

  return (
    <section ref={rootRef} id="contact" className="relative overflow-hidden bg-ice py-16 sm:py-20">
      <div className="page-gutter relative mx-auto max-w-7xl">
        <div className="contact-title mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-blue-600">
            Registration
          </p>
          <h2 className="font-display text-4xl font-bold uppercase text-navy-900 sm:text-5xl">
            Enter the <span className="electric-text">Festival</span>
          </h2>
          <div className="section-rule mx-auto mt-4 h-px w-44" />
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Player, spectator, volunteer, or sponsor — send the form and the
            sports desk will lock your slot.
          </p>
        </div>

        <div className="contact-grid grid gap-10 lg:grid-cols-2">
          <div className="contact-left space-y-5">
            {infos.map((item) => (
              <div
                key={item.title}
                className="corner-lines flex items-start gap-4 rounded-xl bg-white p-5 shadow-[0_10px_30px_-18px_rgba(10,31,66,0.16)] transition-all duration-500 hover:-translate-y-0.5"
              >
                <div>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-blue-600">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-navy-800">{item.value}</p>
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-blue-100 bg-white p-6">
              <h3 className="font-display text-lg font-bold uppercase text-navy-900">
                Follow <span className="electric-text">the week</span>
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={s}
                    href="#contact"
                    className="rounded-full border border-blue-200 px-5 py-2.5 text-sm font-semibold text-navy-800 transition-all hover:-translate-y-1 hover:border-blue-500 hover:text-blue-600"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-form-wrap relative">
            <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-8 shadow-[0_18px_40px_-20px_rgba(10,31,66,0.2)]">
              <h3 className="font-display relative text-2xl font-bold uppercase text-navy-900">
                Team / player <span className="electric-text">entry</span>
              </h3>
              <p className="relative mt-2 text-sm text-slate-500">
                The desk replies to every registration.
              </p>

              <form
                className="relative mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  className="w-full rounded-lg border border-blue-100 bg-ice px-4 py-3.5 text-sm text-navy-900 placeholder-slate-400 outline-none transition-all focus:border-blue-500"
                />
                <input
                  type="text"
                  required
                  placeholder="University / campus"
                  className="w-full rounded-lg border border-blue-100 bg-ice px-4 py-3.5 text-sm text-navy-900 placeholder-slate-400 outline-none transition-all focus:border-blue-500"
                />
                <input
                  type="text"
                  required
                  placeholder="Email / phone"
                  className="w-full rounded-lg border border-blue-100 bg-ice px-4 py-3.5 text-sm text-navy-900 placeholder-slate-400 outline-none transition-all focus:border-blue-500"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <select
                    defaultValue="player"
                    className="w-full rounded-lg border border-blue-100 bg-ice px-4 py-3.5 text-sm text-navy-900 outline-none transition-all focus:border-blue-500"
                  >
                    <option value="player">I want to compete</option>
                    <option value="spectator">I want a spectator pass</option>
                    <option value="volunteer">I want to volunteer</option>
                    <option value="sponsor">I want to sponsor</option>
                  </select>
                  <select
                    defaultValue="football"
                    className="w-full rounded-lg border border-blue-100 bg-ice px-4 py-3.5 text-sm text-navy-900 outline-none transition-all focus:border-blue-500"
                  >
                    <option value="football">Football</option>
                    <option value="cricket">Cricket</option>
                    <option value="basketball">Basketball</option>
                    <option value="volleyball">Volleyball</option>
                    <option value="tennis">Tennis</option>
                    <option value="badminton">Badminton</option>
                    <option value="tt">Table tennis</option>
                    <option value="athletics">Athletics</option>
                    <option value="other">Other / not sure</option>
                  </select>
                </div>
                <textarea
                  rows={3}
                  placeholder="Team name or message (optional)"
                  className="w-full rounded-lg border border-blue-100 bg-ice px-4 py-3.5 text-sm text-navy-900 placeholder-slate-400 outline-none transition-all focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="btn-electric w-full rounded-full py-4 text-sm font-black uppercase tracking-widest"
                >
                  {sent ? "You're on the list" : "Submit entry"}
                </button>
                {sent && (
                  <p className="animate-fade-in text-center text-xs text-blue-600">
                    Received. The PlayFest desk will contact you within 48 hours.
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
