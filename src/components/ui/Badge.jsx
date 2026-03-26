const BADGE_COLORS = {
  default: { bg: "var(--c-surface-2)", color: "var(--c-text-dim)" },
  hot: { bg: "var(--c-accent)", color: "#000" },
  correct: { bg: "#10b981", color: "#000" },
  wrong: { bg: "#ef4444", color: "#fff" },
  Models: { bg: "#6366f1", color: "#fff" },
  Policy: { bg: "#f59e0b", color: "#000" },
  Research: { bg: "#06b6d4", color: "#000" },
  Industry: { bg: "#8b5cf6", color: "#fff" },
};

export default function Badge({ children, variant = "default" }) {
  const s = BADGE_COLORS[variant] || BADGE_COLORS.default;
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: 4,
      fontSize: 11, fontWeight: 600, fontFamily: "var(--fn-mono)",
      background: s.bg, color: s.color, letterSpacing: "0.03em", textTransform: "uppercase"
    }}>
      {children}
    </span>
  );
}
