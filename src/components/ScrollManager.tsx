import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollManager
 * - Keeps scroll position when navigating back to pages (e.g. Home)
 * - Resets scroll to top when going into detail pages
 */
export default function ScrollManager() {
  const { pathname } = useLocation();
  const scrollPositions = useRef<Record<string, number>>({});

  useEffect(() => {
    // Restore scroll if previously saved
    const savedPos = scrollPositions.current[pathname];
    if (savedPos !== undefined) {
      window.scrollTo(0, savedPos);
    } else {
      // Scroll to top for new routes (like Details)
      window.scrollTo({ top: 0, behavior: "auto" });
    }

    // Save scroll position before navigating away
    const handleBeforeUnload = () => {
      scrollPositions.current[pathname] = window.scrollY;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      // Save scroll before route changes
      scrollPositions.current[pathname] = window.scrollY;
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname]);

  return null;
}
