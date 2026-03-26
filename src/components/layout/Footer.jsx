export default function Footer() {
  return (
    <footer style={{
      textAlign: "center", padding: "20px 24px",
      borderTop: "1px solid var(--c-border)",
      fontFamily: "var(--fn-mono)", fontSize: 11,
      color: "var(--c-text-dim)", opacity: 0.5
    }}>
      AI.Hub · Model data is approximate & illustrative · {new Date().getFullYear()}
    </footer>
  );
}
