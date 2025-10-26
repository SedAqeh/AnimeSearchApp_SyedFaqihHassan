import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useState, useMemo, useEffect, useCallback } from "react";
import AnimeCard from "../../components/AnimeCard";
import HomeHeader from "../../components/HomeHeader";
import "./Favorites.scss";
import FloatingButton from "../../components/FloatingButton";

export default function Favorites() {
  const { items } = useSelector((state: RootState) => state.favorites);
  const [localQ, setLocalQ] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  /* =========================================================
     SEARCH FILTERING (local only)
  ========================================================= */
  const filteredItems = useMemo(() => {
    const lower = localQ.toLowerCase();
    return items.filter((anime) => anime.title.toLowerCase().includes(lower));
  }, [items, localQ]);

  /* =========================================================
     SCROLL TO TOP VISIBILITY
  ========================================================= */
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* =========================================================
     RENDER
  ========================================================= */
  return (
    <div className="favorites-container">
      <HomeHeader
        localQ={localQ}
        setLocalQ={setLocalQ}
        title="Your Favorites"
        description="All your saved anime in one place"
        placeholder="Search your favorites…"
        showCarousel={false}
      />

      <div className="content-wrap">
        {items.length === 0 ? (
          <p className="favorites-empty">
            You haven’t added any favorites yet!
          </p>
        ) : filteredItems.length === 0 ? (
          <p className="favorites-empty">No matches found for “{localQ}”.</p>
        ) : (
          <div className="anime-grid">
            {filteredItems.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        )}
      </div>

      <button
        className={`scroll-top-btn ${showScrollTop ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        ⬆
      </button>

      <FloatingButton to="/" icon="🏠" color="#9f7aff" ariaLabel="Go to Home" />
    </div>
  );
}
