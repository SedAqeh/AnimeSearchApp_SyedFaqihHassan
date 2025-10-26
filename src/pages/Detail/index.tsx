import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toggleFavorite } from "../../store/favoritesSlice";
import type { RootState } from "../../store";
import "./Detail.scss";

type Anime = {
  mal_id: number;
  title: string;
  synopsis?: string | null;
  score?: number | null;
  images?: { jpg?: { image_url?: string } };
  genres?: { mal_id: number; name: string }[];
  year?: number;
  episodes?: number;
  status?: string;
  rating?: string;
  studios?: { name: string }[];
  streaming?: { name: string; url: string }[];
};

function SkeletonDetail() {
  return (
    <div className="detail-container skeleton">
      <div className="detail-header">
        <div className="poster skeleton-box"></div>
        <div className="info-section">
          <div className="skeleton-line title"></div>
          <div className="skeleton-tags">
            <div className="skeleton-tag"></div>
            <div className="skeleton-tag"></div>
            <div className="skeleton-tag"></div>
          </div>
          <div className="skeleton-line short"></div>
          <div className="skeleton-meta">
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
          </div>
        </div>
      </div>

      <div className="synopsis-section">
        <div className="skeleton-line wide"></div>
        <div className="skeleton-line wide"></div>
        <div className="skeleton-line mid"></div>
      </div>
    </div>
  );
}

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const abortRef = useRef<AbortController | null>(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = useMemo(
    () => !!anime && favorites.some((f) => f.mal_id === anime.mal_id),
    [favorites, anime]
  );

  // Retry fetch with 429 handling
  const fetchWithRetry = async (
    url: string,
    options: { signal: AbortSignal },
    retries = 3,
    delay = 1000
  ): Promise<any> => {
    try {
      const res = await axios.get(url, options);
      return res;
    } catch (err: any) {
      if (err.name === "CanceledError") throw err;
      if (err.response?.status === 429 && retries > 0) {
        const retryAfter =
          (Number(err.response.headers["retry-after"]) || delay / 1000) * 1000;
        console.warn(`⚠️ Rate limited (429). Retrying in ${retryAfter}ms...`);
        await new Promise((resolve) => setTimeout(resolve, retryAfter));
        return fetchWithRetry(url, options, retries - 1, delay * 2);
      }
      throw err;
    }
  };

  // Fetch anime details
  useEffect(() => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setStatus("loading");
    setAnime(null);

    (async () => {
      try {
        const res = await fetchWithRetry(
          `https://api.jikan.moe/v4/anime/${id}/full`,
          { signal: controller.signal }
        );

        if (res.data?.data) {
          setAnime(res.data.data);
          setTimeout(() => setStatus("success"), 200);
        } else {
          setStatus("error");
        }
      } catch (err) {
        if ((err as any)?.name !== "CanceledError") {
          console.error("❌ Fetch failed:", err);
          setStatus("error");
        }
      }
    })();

    return () => controller.abort();
  }, [id]);

  const handleToggleFavorite = () => {
    if (!anime) return;
    dispatch(toggleFavorite(anime));
  };

  const handleBack = () => {
    if (window.history.length > 2) navigate(-1);
    else navigate("/");
  };

  if (status === "loading" || status === "idle") return <SkeletonDetail />;
  if (status === "error" || !anime)
    return (
      <div className="detail-container fade-in">
        <h2>No anime found.</h2>
      </div>
    );

  const data = anime;

  return (
    <div className="detail-container fade-in">
      <div
        className="hero-banner"
        style={{ backgroundImage: `url(${data.images?.jpg?.image_url})` }}
      >
        <div className="hero-overlay" />
      </div>

      <button className="back-btn" onClick={handleBack} aria-label="Go Back">
        ← Back
      </button>

      <div className="detail-header">
        <img
          src={data.images?.jpg?.image_url}
          alt={data.title}
          className="poster"
        />

        <div className="info-section">
          <h1 className="title">{data.title}</h1>

          <div className="genre-tags">
            {data.genres?.slice(0, 3).map((g) => (
              <span key={g.mal_id} className="tag">
                {g.name}
              </span>
            ))}
          </div>

          <div className="rating-row">
            <span className="stars">⭐ {data.score ?? "N/A"}</span>
            {data.rating && <span className="rating-label">{data.rating}</span>}
          </div>

          <div className="meta">
            <p>
              <strong>Year:</strong> {data.year ?? "Unknown"}
            </p>
            <p>
              <strong>Episodes:</strong> {data.episodes ?? "?"}
            </p>
            <p>
              <strong>Status:</strong> {data.status ?? "?"}
            </p>
            <p>
              <strong>Studios:</strong>{" "}
              {data.studios?.map((s) => s.name).join(", ") ?? "?"}
            </p>
          </div>
        </div>

        <button
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={handleToggleFavorite}
          aria-label="Toggle Favorite"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      {data.streaming && data.streaming.length > 0 && (
        <div className="streaming-section">
          <h3>Available On</h3>
          <div className="streaming-links">
            {data.streaming.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="stream-link"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="synopsis-section">
        <h3>Synopsis</h3>
        <p>{data.synopsis || "No synopsis available."}</p>
      </div>
    </div>
  );
}
