// "use client";
// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
// import PageLoader from "./loader/PageLoader";

// export default function TransitionWrapper({ children }) {
//   const pathname = usePathname(); // tells us when route changes
//   const [loading, setLoading] = useState(true);
//   const [prevPath, setPrevPath] = useState(pathname);

//   // Loader on first page load
//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1200);
//     return () => clearTimeout(timer);
//   }, []);

//   // Loader when changing pages
//   useEffect(() => {
//     if (pathname !== prevPath) {
//       setLoading(true);
//       const timer = setTimeout(() => setLoading(false), 1200);
//       setPrevPath(pathname); // update previous path
//       return () => clearTimeout(timer);
//     }
//   }, [pathname, prevPath]);

//   if (loading) return <PageLoader />;

//   return <>{children}</>;
// }


"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PageLoader from "./loader/PageLoader";

export default function TransitionWrapper({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [prevPath, setPrevPath] = useState(pathname);

  // Loader on first page load
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Loader when changing pages
  useEffect(() => {
    if (pathname !== prevPath) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1200);
      setPrevPath(pathname); // update previous path
      return () => clearTimeout(timer);
    }
  }, [pathname, prevPath]);

  if (loading) return <PageLoader />;

  return <>{children}</>;
}
