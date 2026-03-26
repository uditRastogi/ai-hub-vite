export default function Header() {
  return (
    <header style={{
      padding: "60px 24px 40px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "linear-gradient(var(--c-accent) 1px, transparent 1px), linear-gradient(90deg, var(--c-accent) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        animation: "gridDrift 8s linear infinite",
      }} />
      <div style={{ position: "relative" }}>
        <div style={{
          fontFamily: "var(--fn-mono)", fontSize: 11, color: "var(--c-accent)",
          letterSpacing: "0.2em", marginBottom: 12, textTransform: "uppercase",
          animation: "glowPulse 3s ease infinite"
        }}>
          Intelligence Observatory
        </div>
        <h1 style={{
          fontFamily: "var(--fn-display)", fontSize: "clamp(36px, 6vw, 60px)",
          fontWeight: 900, color: "var(--c-text)", lineHeight: 1.1, marginBottom: 12,
          animation: "fadeSlideUp 0.6s ease"
        }}>
          The AI<span style={{ color: "var(--c-accent)" }}>.</span>Hub
        </h1>
        <p style={{
          fontFamily: "var(--fn-body)", fontSize: 15, color: "var(--c-text-dim)",
          maxWidth: 480, margin: "0 auto", lineHeight: 1.6,
          animation: "fadeSlideUp 0.6s ease 0.1s both"
        }}>
          Compare frontier models. Test your knowledge. Track the signal.
        </p>
      </div>
    </header>
  );
}
