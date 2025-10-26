import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import {
  setQuery,
  fetchAnimePage,
  ANIME_PAGE_LIMIT,
} from "../../store/searchSlice";
import "./Home.scss";
import AnimeCard from "../../components/AnimeCard";
import SkeletonCard from "../../components/SkeletonCard";
import HomeHeader from "../../components/HomeHeader";
import FloatingButton from "../../components/FloatingButton";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, query, loading, error, hasNext, page } = useSelector(
    (state: RootState) => state.search
  );

  const favoriteCount = useSelector(
    (state: RootState) => state.favorites.items.length
  );

  const [localQ, setLocalQ] = useState(query);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const debounceRef = useRef<number | undefined>(undefined);
  const lastTriggerTimeRef = useRef(0);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  /* =========================================================
     FETCHING & SEARCH LOGIC
  ========================================================= */
  const handleSearch = useCallback(() => {
    // Only scroll to top if query actually changes
    if (localQ.trim() !== query.trim()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      dispatch(setQuery(localQ));
      dispatch(fetchAnimePage({ page: 1, query: localQ }));
    }
  }, [dispatch, localQ, query]);

  // Debounce search to avoid firing too often
  useEffect(() => {
    window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(handleSearch, 250);
    return () => window.clearTimeout(debounceRef.current);
  }, [localQ, handleSearch]);

  // Initial fetch on mount
  useEffect(() => {
    if (list.length === 0) dispatch(fetchAnimePage({ page: 1 }));
  }, [dispatch, list.length]);

  /* =========================================================
     INFINITE SCROLL
  ========================================================= */
  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNext && !loading && !scrollLoading) {
          const now = Date.now();
          if (now - lastTriggerTimeRef.current > 1200) {
            lastTriggerTimeRef.current = now;
            setScrollLoading(true);

            dispatch(fetchAnimePage({ page: page + 1, query })).finally(() =>
              setScrollLoading(false)
            );
          }
        }
      },
      { rootMargin: "500px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [dispatch, hasNext, loading, scrollLoading, page, query]);

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

  const animeList = useMemo(
    () => list.map((anime) => <AnimeCard key={anime.mal_id} anime={anime} />),
    [list]
  );

  return (
    <div className="home-container">
      <HomeHeader localQ={localQ} setLocalQ={setLocalQ} />

      {error && <div className="error-message">{error}</div>}

      <div className="content-wrap">
        <div className="anime-grid">
          {loading && list.length === 0
            ? Array.from({ length: ANIME_PAGE_LIMIT }).map((_, i) => (
                <SkeletonCard key={`skeleton-init-${i}`} />
              ))
            : animeList}

          {/* ✅ Inline skeletons for pagination */}
          {(loading || scrollLoading) &&
            list.length > 0 &&
            Array.from({ length: ANIME_PAGE_LIMIT }).map((_, i) => (
              <SkeletonCard key={`skeleton-more-${i}`} />
            ))}
        </div>

        <div ref={loadMoreRef} className="scroll-sentinel" />

        {!hasNext && !loading && list.length > 0 && (
          <div className="end-text">No more results</div>
        )}
      </div>

      <button
        className={`scroll-top-btn ${showScrollTop ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        ⬆
      </button>

      <FloatingButton
        to="/favorites"
        icon="❤️"
        count={favoriteCount}
        color="#ff4d6d"
        ariaLabel="Go to Favorites"
      />
    </div>
  );
}
