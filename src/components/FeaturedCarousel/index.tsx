import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { fetchTopAnime } from "../../store/topAnimeSlice";
import { useNavigate } from "react-router-dom";
import "./FeaturedCarousel.scss";

const FeaturedCarousel: React.FC<{ className?: string }> = ({ className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { list, loading } = useSelector((state: RootState) => state.topAnime);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchTopAnime());
    }
  }, [dispatch, list.length]);

  const items = useMemo(() => [...list, ...list], [list]);

  return (
    <div className={`carousel-wrapper ${className || ""}`} ref={containerRef}>
      <p className="carousel-title">🔥 Trending</p>
      <div className="carousel-track">
        {loading && list.length === 0
          ? Array.from({ length: 10 }).map((_, i) => (
              <div className="carousel-item skeleton" key={`skeleton-${i}`}>
                <div className="skeleton-img" />
                <div className="carousel-overlay"></div>
              </div>
            ))
          : items.map((anime, i) => (
              <div
                className="carousel-item"
                key={`${anime.mal_id}-${i}`}
                onClick={() => navigate(`/anime/${anime.mal_id}`)}
              >
                <img
                  src={anime.images?.jpg?.image_url}
                  alt={anime.title}
                  loading="lazy"
                />
                <div className="carousel-overlay">
                  <h4>{anime.title}</h4>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;
