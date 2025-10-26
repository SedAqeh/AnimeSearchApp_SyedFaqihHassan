import { Link } from "react-router-dom";
import "./FloatingButton.scss";
import React from "react";

interface FloatingButtonProps {
  to: string;
  icon: React.ReactNode;
  count?: number;
  color?: string;
  className?: string;
  ariaLabel?: string;
}

function FloatingButton({
  to,
  icon,
  count,
  color = "var(--color-accent)",
  className = "",
  ariaLabel = "Floating Button",
}: FloatingButtonProps) {
  return (
    <Link
      to={to}
      className={`floating-btn ${className}`}
      aria-label={ariaLabel}
      style={{ background: color }}
    >
      <span className="icon">{icon}</span>
      {count !== undefined && count > 0 && (
        <span className="count">{count}</span>
      )}
    </Link>
  );
}

export default React.memo(FloatingButton);
