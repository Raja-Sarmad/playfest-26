export default function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-28 top-[-12%] h-[34rem] w-[34rem] rounded-full bg-gradient-to-br from-cyan-400/35 via-blue-400/20 to-transparent blur-3xl" />
      <div className="absolute -right-20 top-[6%] h-[30rem] w-[30rem] rounded-full bg-gradient-to-bl from-blue-500/30 via-cyan-400/15 to-transparent blur-3xl" />
      <div className="absolute bottom-[-12%] left-[20%] h-[26rem] w-[36rem] rounded-full bg-gradient-to-tr from-gold-400/18 via-blue-400/10 to-transparent blur-3xl" />
      <div className="grid-bg absolute inset-0 opacity-50" />
    </div>
  );
}
