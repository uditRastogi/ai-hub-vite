import { Routes, Route, Navigate } from "react-router-dom";
import AIHub from "./pages/AIHub";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AIHub />} />
      <Route path="/feed" element={<AIHub defaultTab="news" />} />
      <Route path="/models" element={<AIHub defaultTab="models" />} />
      <Route path="/quiz" element={<AIHub defaultTab="quiz" />} />
      {/* Catch-all → redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
