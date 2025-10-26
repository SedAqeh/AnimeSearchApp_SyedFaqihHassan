import { useEffect, useState } from "react";
import "./ThemeToggle.scss";

export default function ThemeToggle({}) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      className={`theme-toggle ${theme}`}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle dark mode"
    >
      <span className="icon">{theme === "light" ? "🌙" : "☀️"}</span>
    </button>
  );
}
