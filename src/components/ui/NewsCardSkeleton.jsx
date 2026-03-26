export default function NewsCardSkeleton({ delay = 0 }) {
  return (
    <div style={{
      padding: 20, borderRadius: 12, background: "var(--c-surface-1)",
      border: "1px solid var(--c-border)",
      animation: `fadeSlideUp 0.3s ease ${delay}s both`
    }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <div style={{ width: 60, height: 18, borderRadius: 4, background: "var(--c-surface-2)", animation: "shimmer 1.5s ease infinite" }} />
        <div style={{ width: 50, height: 18, borderRadius: 4, background: "var(--c-surface-2)", animation: "shimmer 1.5s ease infinite 0.1s" }} />
      </div>
      <div style={{ width: "85%", height: 18, borderRadius: 4, background: "var(--c-surface-2)", marginBottom: 8, animation: "shimmer 1.5s ease infinite 0.2s" }} />
      <div style={{ width: "65%", height: 14, borderRadius: 4, background: "var(--c-surface-2)", animation: "shimmer 1.5s ease infinite 0.3s" }} />
    </div>
  );
}
