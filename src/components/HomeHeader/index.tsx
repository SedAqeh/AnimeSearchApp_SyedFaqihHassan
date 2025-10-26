import { useState, useEffect } from "react";
import FeaturedCarousel from "../FeaturedCarousel";
import "./HomeHeader.scss";

interface HomeHeaderProps {
  localQ: string;
  setLocalQ: (val: string) => void;
  title?: string;
  description?: string;
  showCarousel?: boolean;
  placeholder?: string;
}

export default function HomeHeader({
  localQ,
  setLocalQ,
  title = "Anime Search",
  description = "Find your next obsession, one anime at a time",
  showCarousel = true,
  placeholder = "Search anime…",
}: HomeHeaderProps) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!showCarousel) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const current = window.scrollY;
          setCollapsed((prev) =>
            current > 100 ? true : current === 0 ? false : prev
          );
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showCarousel]);

  return (
    <div
      className={`home-header ${showCarousel ? "" : "no-collapse"} ${
        collapsed ? "collapsed" : ""
      }`}
    >
      <div className="home-header-info">
        <div className="home-header-title">
          <h1 className="home-title">{title}</h1>
          <p className="home-description">{description}</p>
        </div>

        <div className="home-search">
          <input
            aria-label={placeholder}
            placeholder={placeholder}
            value={localQ}
            onChange={(e) => setLocalQ(e.target.value)}
          />
        </div>
      </div>

      {showCarousel && <FeaturedCarousel />}
    </div>
  );
}
