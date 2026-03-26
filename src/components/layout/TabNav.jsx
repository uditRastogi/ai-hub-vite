const TABS = [
  { id: "news", label: "Signal Feed", icon: "\u25A6" },
  { id: "models", label: "Model Arena", icon: "\u26A1" },
  { id: "quiz", label: "AI Quiz", icon: "\u25C6" },
];

export default function TabNav({ activeTab, onTabChange }) {
  return (
    <nav style={{
      display: "flex", justifyContent: "center", gap: 4,
      padding: "0 24px 32px",
      animation: "fadeSlideUp 0.5s ease 0.2s both"
    }}>
      {TABS.map((t) => (
        <button key={t.id} onClick={() => onTabChange(t.id)} style={{
          padding: "12px 24px", borderRadius: 10, border: "none", cursor: "pointer",
          fontFamily: "var(--fn-mono)", fontSize: 13,
          fontWeight: activeTab === t.id ? 700 : 400,
          background: activeTab === t.id ? "var(--c-accent)" : "var(--c-surface-1)",
          color: activeTab === t.id ? "#000" : "var(--c-text-dim)",
          transition: "all .2s",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ fontSize: 14 }}>{t.icon}</span> {t.label}
        </button>
      ))}
    </nav>
  );
}
