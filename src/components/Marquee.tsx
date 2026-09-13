const ITEMS = [
  "PLAY",
  "PERFORM",
  "CELEBRATE",
  "PUBG",
  "FREE FIRE",
  "CRICKET",
  "BADMINTON",
  "HACKATHON",
  "LOGO DESIGNING",
  "CHESS",
  "TUG OF WAR",
  "TREASURE HUNT",
  "EARLY BIRD",
  "PLAYFEST '26",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative z-10 overflow-hidden bg-gradient-to-r from-[#042047] via-[#0a8fff] to-[#042047] py-2.5">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-8">
            <span className="font-display text-sm font-semibold uppercase tracking-[0.32em] text-white">
              {item}
            </span>
            <span className="text-gold-400">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
