import React from "react";
import "./SkeletonCard.scss";

const SkeletonCard: React.FC = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img shimmer"></div>
      <div className="skeleton-info">
        <div className="skeleton-line shimmer" style={{ width: "80%" }}></div>
        <div className="skeleton-line shimmer" style={{ width: "60%" }}></div>
      </div>
    </div>
  );
};

export default React.memo(SkeletonCard);
