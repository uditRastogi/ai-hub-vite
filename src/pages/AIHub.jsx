import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MODELS, QUIZ_QUESTIONS } from "../constants";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import TabNav from "../components/layout/TabNav";
import NewsFeed from "../features/news/NewsFeed";
import ModelEval from "../features/models/ModelEval";
import AIQuiz from "../features/quiz/AIQuiz";
import "../styles/global.css";

const TAB_ROUTES = { news: "/feed", models: "/models", quiz: "/quiz" };

export default function AIHub({ defaultTab = "news" }) {
  const [tab, setTab] = useState(defaultTab);
  const navigate = useNavigate();

  const handleTab = (id) => {
    setTab(id);
    navigate(TAB_ROUTES[id], { replace: true });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--c-bg)",
      color: "var(--c-text)",
      fontFamily: "var(--fn-body)",
    }}>
      <Header />
      <TabNav activeTab={tab} onTabChange={handleTab} />

      <main style={{
        maxWidth: 960, margin: "0 auto", padding: "0 24px 80px",
        animation: "fadeSlideUp 0.4s ease"
      }} key={tab}>
        <div style={{
          display: "flex", alignItems: "center", gap: 12, marginBottom: 28,
          paddingBottom: 16, borderBottom: "1px solid var(--c-border)"
        }}>
          <h2 style={{ fontFamily: "var(--fn-display)", fontSize: 28, color: "var(--c-text)", margin: 0 }}>
            {tab === "models" && "Model Arena"}
            {tab === "quiz" && "AI Knowledge Check"}
            {tab === "news" && "Signal Feed"}
          </h2>
          <span style={{
            fontFamily: "var(--fn-mono)", fontSize: 11, color: "var(--c-text-dim)",
            padding: "3px 8px", background: "var(--c-surface-2)", borderRadius: 4
          }}>
            {tab === "models" && `${MODELS.length} models`}
            {tab === "quiz" && `${QUIZ_QUESTIONS.length} questions`}
            {tab === "news" && "Live feed"}
          </span>
        </div>
        {tab === "models" && <ModelEval />}
        {tab === "quiz" && <AIQuiz />}
        {tab === "news" && <NewsFeed />}
      </main>

      <Footer />
    </div>
  );
}
