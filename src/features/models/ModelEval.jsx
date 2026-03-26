import { useState } from "react";
import { MODELS } from "../../constants";
import StatBar from "../../components/ui/StatBar";
import Badge from "../../components/ui/Badge";

const DIMS = ["reasoning", "coding", "creative", "speed"];
const BAR_COLORS = ["var(--c-accent)", "#6366f1", "#06b6d4", "#f59e0b", "#ef4444"];

export default function ModelEval() {
  const [selected, setSelected] = useState([MODELS[0].id, MODELS[1].id]);
  const [dim, setDim] = useState("reasoning");

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((x) => x !== id) : prev) : [...prev, id]
    );
  };

  const selModels = MODELS.filter((m) => selected.includes(m.id));

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
        {MODELS.map((m) => (
          <button key={m.id} onClick={() => toggle(m.id)} style={{
            padding: "8px 16px", borderRadius: 6,
            border: selected.includes(m.id) ? "2px solid var(--c-accent)" : "1px solid var(--c-border)",
            background: selected.includes(m.id) ? "var(--c-accent-dim)" : "var(--c-surface-1)",
            color: "var(--c-text)", cursor: "pointer",
            fontFamily: "var(--fn-body)", fontSize: 13,
            fontWeight: selected.includes(m.id) ? 700 : 400, transition: "all .2s"
          }}>
            {m.name}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
        {DIMS.map((d) => (
          <button key={d} onClick={() => setDim(d)} style={{
            padding: "5px 14px", borderRadius: 20, fontSize: 12,
            fontFamily: "var(--fn-mono)", border: "none", cursor: "pointer",
            background: dim === d ? "var(--c-text)" : "var(--c-surface-2)",
            color: dim === d ? "var(--c-bg)" : "var(--c-text-dim)", transition: "all .15s"
          }}>
            {d}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {selModels.map((m, i) => (
          <div key={m.id} style={{
            background: "var(--c-surface-1)", border: "1px solid var(--c-border)",
            borderRadius: 12, padding: 24,
            animation: `fadeSlideUp 0.4s ease ${i * 0.08}s both`
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <h3 style={{ margin: 0, fontFamily: "var(--fn-display)", fontSize: 20, color: "var(--c-text)" }}>{m.name}</h3>
                <span style={{ fontSize: 12, color: "var(--c-text-dim)", fontFamily: "var(--fn-mono)" }}>{m.vendor} · {m.released}</span>
              </div>
              <Badge>{m.multimodal ? "Multi" : "Text"}</Badge>
            </div>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 20px",
              fontSize: 12, fontFamily: "var(--fn-mono)", color: "var(--c-text-dim)",
              marginBottom: 16, padding: "12px 0",
              borderTop: "1px solid var(--c-border)", borderBottom: "1px solid var(--c-border)"
            }}>
              <div>Context: <b style={{ color: "var(--c-text)" }}>{m.context}</b></div>
              <div>Cost: <b style={{ color: "var(--c-text)" }}>{m.cost}</b></div>
              <div>Params: <b style={{ color: "var(--c-text)" }}>{m.params}</b></div>
            </div>
            <StatBar value={m[dim]} label={dim.toUpperCase()} color={BAR_COLORS[i % BAR_COLORS.length]} />
            <StatBar value={m.reasoning} label="REASONING" color={BAR_COLORS[(i + 1) % BAR_COLORS.length]} />
            <StatBar value={m.coding} label="CODING" color={BAR_COLORS[(i + 2) % BAR_COLORS.length]} />
            <div style={{ marginTop: 14, fontSize: 12, color: "var(--c-text-dim)" }}>
              <div style={{ marginBottom: 6 }}>
                <span style={{ color: "#10b981", fontFamily: "var(--fn-mono)" }}>+</span>{" "}
                {m.strengths[0]}
              </div>
              <div>
                <span style={{ color: "#ef4444", fontFamily: "var(--fn-mono)" }}>−</span>{" "}
                {m.weaknesses[0]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
