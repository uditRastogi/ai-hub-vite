import { useState, useEffect, useRef } from "react";
import { SEARCH_QUERIES } from "../../constants";
import { fetchAINews } from "./newsApi";
import Badge from "../../components/ui/Badge";
import NewsCardSkeleton from "../../components/ui/NewsCardSkeleton";

const CATEGORIES = ["All", "Models", "Research", "Policy", "Industry"];

export default function NewsFeed() {
  const [filter, setFilter] = useState("All");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const sentinelRef = useRef(null);
  const loadingRef = useRef(false);

  const loadPage = async (idx) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setError(null);
    try {
      const newItems = await fetchAINews(idx);
      if (newItems.length === 0) {
        if (idx < SEARCH_QUERIES.length * 2) {
          loadingRef.current = false;
          setPageIndex(idx + 1);
          return;
        }
        setHasMore(false);
      } else {
        setItems(prev => [...prev, ...newItems]);
        setPageIndex(idx + 1);
      }
    } catch (e) {
      setError("Failed to fetch news. Scroll down to retry.");
    } finally {
      setLoading(false);
      setInitialLoading(false);
      loadingRef.current = false;
    }
  };

  useEffect(() => { loadPage(0); }, []);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current && hasMore) {
          loadPage(pageIndex);
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [pageIndex, hasMore]);

  const filtered = filter === "All" ? items : items.filter(n => n.category === filter);

  return (
    <div>
      {/* Category filter pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding: "6px 16px", borderRadius: 20, fontSize: 12,
            fontFamily: "var(--fn-mono)", border: "none", cursor: "pointer",
            background: filter === c ? "var(--c-text)" : "var(--c-surface-2)",
            color: filter === c ? "var(--c-bg)" : "var(--c-text-dim)", transition: "all .15s"
          }}>{c}</button>
        ))}
        {items.length > 0 && (
          <span style={{
            marginLeft: "auto", fontSize: 11, fontFamily: "var(--fn-mono)",
            color: "var(--c-text-dim)", alignSelf: "center"
          }}>
            {filtered.length} article{filtered.length !== 1 ? "s" : ""} loaded
          </span>
        )}
      </div>

      {/* Live status indicator */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8, marginBottom: 16,
        padding: "8px 14px", borderRadius: 8, background: "var(--c-surface-1)",
        border: "1px solid var(--c-border)", fontSize: 12
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: initialLoading ? "#f59e0b" : error ? "#ef4444" : "#10b981",
          animation: loading ? "glowPulse 1s ease infinite" : "none",
          boxShadow: !error && !initialLoading ? "0 0 6px #10b981" : "none"
        }} />
        <span style={{ fontFamily: "var(--fn-mono)", color: "var(--c-text-dim)" }}>
          {initialLoading ? "Searching the web for latest AI news\u2026" : loading ? "Loading more stories\u2026" : error ? error : "Live feed \u00B7 Powered by web search"}
        </span>
      </div>

      {/* Initial loading skeletons */}
      {initialLoading && (
        <div style={{ display: "grid", gap: 12 }}>
          {[0, 1, 2, 3, 4].map(i => <NewsCardSkeleton key={i} delay={i * 0.06} />)}
        </div>
      )}

      {/* Empty state */}
      {!initialLoading && filtered.length === 0 && !loading && (
        <div style={{
          textAlign: "center", padding: "40px 0", color: "var(--c-text-dim)",
          fontFamily: "var(--fn-mono)", fontSize: 14
        }}>
          {filter !== "All" ? `No ${filter} articles loaded yet. Try "All" or scroll to load more.` : "No articles found. Check your connection and refresh."}
        </div>
      )}

      {/* News items */}
      <div style={{ display: "grid", gap: 12 }}>
        {filtered.map((n, i) => (
          <div key={n.id} style={{
            padding: 20, borderRadius: 12, background: "var(--c-surface-1)",
            border: "1px solid var(--c-border)", cursor: "default", transition: "all .2s",
            animation: `fadeSlideUp 0.3s ease ${(i % 5) * 0.06}s both`
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--c-accent)"; e.currentTarget.style.transform = "translateX(4px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--c-border)"; e.currentTarget.style.transform = "translateX(0)"; }}
          >
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
              <Badge variant={n.category}>{n.category}</Badge>
              {n.hot && <Badge variant="hot">Top</Badge>}
              <span style={{
                marginLeft: "auto", fontSize: 11, fontFamily: "var(--fn-mono)",
                color: "var(--c-text-dim)", display: "flex", gap: 8
              }}>
                {n.source && <span style={{ opacity: 0.7 }}>{n.source}</span>}
                {n.date}
              </span>
            </div>
            <h4 style={{ margin: "0 0 6px", fontFamily: "var(--fn-display)", fontSize: 17, color: "var(--c-text)", lineHeight: 1.3 }}>{n.title}</h4>
            <p style={{ margin: 0, fontSize: 13, color: "var(--c-text-dim)", lineHeight: 1.5 }}>{n.summary}</p>
          </div>
        ))}
      </div>

      {/* Loading more skeletons */}
      {loading && !initialLoading && (
        <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
          {[0, 1, 2].map(i => <NewsCardSkeleton key={`load-${i}`} delay={i * 0.08} />)}
        </div>
      )}

      {/* Infinite scroll sentinel */}
      {hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}

      {/* End of feed */}
      {!hasMore && items.length > 0 && (
        <div style={{
          textAlign: "center", padding: "32px 0 16px", fontFamily: "var(--fn-mono)",
          fontSize: 12, color: "var(--c-text-dim)", opacity: 0.5
        }}>
          \u2500\u2500 End of feed \u2500\u2500
        </div>
      )}
    </div>
  );
}
