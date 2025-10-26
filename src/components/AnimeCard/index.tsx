import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../store/favoritesSlice";
import type { RootState } from "../../store";
import "./AnimeCard.scss";

type AnimeCardProps = {
  anime: {
    mal_id: number;
    title: string;
    score?: number | null;
    images?: { jpg?: { image_url?: string } };
    genres?: { name: string }[];
    rating?: string | null;
    status?: string | { name: string } | null;
  };
};

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFav = useMemo(
    () => favorites.some((f) => f.mal_id === anime.mal_id),
    [favorites, anime.mal_id]
  );

  // Convert score (0–10) → stars (0–5)
  const stars = Math.round((anime.score ?? 0) / 2);
  const genres =
    anime.genres
      ?.slice(0, 3)
      .map((g) => g.name)
      .join(", ") || "Unknown";
  const statusText =
    typeof anime.status === "string"
      ? anime.status
      : anime.status?.name || "Unknown";

  return (
    <div
      className="anime-card"
      onClick={() => navigate(`/anime/${anime.mal_id}`)}
    >
      <img
        src={anime.images?.jpg?.image_url}
        alt={anime.title}
        className="anime-img"
      />

      <div className="anime-info">
        <h3 className="anime-title">{anime.title}</h3>

        <div>
          <div className="anime-meta">
            <p>{genres}</p>
            <p>{statusText}</p>
          </div>

          <div className="anime-rating">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < stars ? "star filled" : "star"}>
                ★
              </span>
            ))}
            <span className="score-text">
              {anime.score ? `(${anime.score.toFixed(1)})` : "(N/A)"}
            </span>
          </div>
        </div>
      </div>
      <button
        className={`fav-btn ${isFav ? "active" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(toggleFavorite(anime));
        }}
      >
        {isFav ? "❤️" : "🤍"}
      </button>
    </div>
  );
};

export default AnimeCard;
