import { useState } from "react";
import { QUIZ_QUESTIONS } from "../../constants";

export default function AIQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [picked, setPicked] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const total = QUIZ_QUESTIONS.length;

  const handlePick = (idx) => {
    if (picked !== null) return;
    setPicked(idx);
    setAnswers((prev) => [...prev, idx === QUIZ_QUESTIONS[current].correct]);
  };

  const next = () => {
    if (current < total - 1) { setCurrent((c) => c + 1); setPicked(null); }
    else setShowResult(true);
  };

  const reset = () => { setCurrent(0); setAnswers([]); setPicked(null); setShowResult(false); };
  const score = answers.filter(Boolean).length;

  if (showResult) {
    const pct = Math.round((score / total) * 100);
    const grade = pct >= 90 ? "A+" : pct >= 80 ? "A" : pct >= 70 ? "B" : pct >= 60 ? "C" : "D";
    return (
      <div style={{ textAlign: "center", padding: "40px 0", animation: "fadeSlideUp .5s ease" }}>
        <div style={{ fontFamily: "var(--fn-display)", fontSize: 72, color: "var(--c-accent)", lineHeight: 1 }}>{grade}</div>
        <div style={{ fontFamily: "var(--fn-mono)", fontSize: 18, color: "var(--c-text-dim)", margin: "16px 0" }}>{score}/{total} correct — {pct}%</div>
        <div style={{ fontSize: 14, color: "var(--c-text-dim)", marginBottom: 28, maxWidth: 400, margin: "0 auto 28px" }}>
          {pct >= 80 ? "Impressive command of AI fundamentals. You'd hold your own in any architecture review." : pct >= 60 ? "Solid foundation. A few more papers and you're there." : "Worth revisiting the fundamentals — the field moves fast."}
        </div>
        <button onClick={reset} style={{
          padding: "12px 32px", borderRadius: 8, border: "none",
          background: "var(--c-accent)", color: "#000",
          fontFamily: "var(--fn-mono)", fontSize: 14, fontWeight: 700,
          cursor: "pointer", letterSpacing: "0.05em"
        }}>RETAKE QUIZ</button>
      </div>
    );
  }

  const q = QUIZ_QUESTIONS[current];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <span style={{ fontFamily: "var(--fn-mono)", fontSize: 13, color: "var(--c-text-dim)" }}>
          Q{current + 1} / {total}
        </span>
        <div style={{ display: "flex", gap: 4 }}>
          {answers.map((a, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: a ? "#10b981" : "#ef4444" }} />
          ))}
          {Array.from({ length: total - answers.length }).map((_, i) => (
            <div key={`e${i}`} style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--c-surface-2)" }} />
          ))}
        </div>
      </div>
      <h3 style={{ fontFamily: "var(--fn-display)", fontSize: 22, color: "var(--c-text)", lineHeight: 1.4, margin: "0 0 24px" }}>{q.q}</h3>
      <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correct;
          const isPicked = i === picked;
          let bg = "var(--c-surface-1)";
          let border = "1px solid var(--c-border)";
          if (picked !== null) {
            if (isCorrect) { bg = "rgba(16,185,129,0.12)"; border = "2px solid #10b981"; }
            else if (isPicked) { bg = "rgba(239,68,68,0.12)"; border = "2px solid #ef4444"; }
          }
          return (
            <button key={i} onClick={() => handlePick(i)} style={{
              padding: "14px 18px", borderRadius: 10, border, background: bg,
              cursor: picked !== null ? "default" : "pointer",
              textAlign: "left", fontFamily: "var(--fn-body)", fontSize: 15,
              color: "var(--c-text)", transition: "all .2s",
              display: "flex", alignItems: "center", gap: 12
            }}>
              <span style={{ fontFamily: "var(--fn-mono)", fontSize: 12, color: "var(--c-text-dim)", minWidth: 20 }}>
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div style={{ animation: "fadeSlideUp .3s ease", marginBottom: 20 }}>
          <div style={{
            padding: 16, borderRadius: 10, background: "var(--c-surface-2)",
            fontSize: 13, color: "var(--c-text-dim)", lineHeight: 1.6,
            borderLeft: `3px solid ${picked === q.correct ? "#10b981" : "#ef4444"}`
          }}>
            {q.explanation}
          </div>
          <button onClick={next} style={{
            marginTop: 14, padding: "10px 28px", borderRadius: 8, border: "none",
            background: "var(--c-accent)", color: "#000",
            fontFamily: "var(--fn-mono)", fontSize: 13, fontWeight: 700, cursor: "pointer"
          }}>
            {current < total - 1 ? "NEXT \u2192" : "SEE RESULTS"}
          </button>
        </div>
      )}
    </div>
  );
}
