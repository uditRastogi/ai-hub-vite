import { useState, useEffect } from "react";

export default function StatBar({ value, label, color }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 200);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{
        display: "flex", justifyContent: "space-between", fontSize: 12,
        fontFamily: "var(--fn-mono)", marginBottom: 4, color: "var(--c-text-dim)"
      }}>
        <span>{label}</span><span>{value}/100</span>
      </div>
      <div style={{ height: 6, background: "var(--c-surface-2)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${width}%`, background: color,
          borderRadius: 3, transition: "width 0.8s cubic-bezier(.4,0,.2,1)"
        }} />
      </div>
    </div>
  );
}
