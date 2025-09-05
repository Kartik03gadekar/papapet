"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PageLoader from "./loader/PageLoader";

export default function TransitionWrapper({ children }) {
  const pathname = usePathname(); // tells us when route changes
  const [loading, setLoading] = useState(true);

  // Loader on first page load
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Loader when changing pages
  useEffect(() => {
    if (!loading) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  if (loading) return <PageLoader />;

  return <>{children}</>;
}
