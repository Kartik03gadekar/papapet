"use client";

import NavPapaPet from "@/Components/Nav/NavPapaPet";
import Sidebar from "@/Components/Setting/Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const navItems = [
  { name: "Profile", path: "/papapet/dashboard/profile" },
  { name: "Order History", path: "/papapet/dashboard/orderhistory" },
  { name: "Track Order", path: "/papapet/dashboard/trackorder" },
  { name: "Shopping Cart", path: "/papapet/dashboard/shoppingcart" },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const mobileNavRef = useRef(null);

  useEffect(() => {
    const index = navItems.findIndex((item) => pathname?.startsWith(item.path));
    setActiveIndex(index >= 0 ? index : 0);
  }, [pathname]);

  // Close mobile nav on outside click
  useEffect(() => {
    if (!mobileNavOpen) return;
    function handleClick(e) {
      if (mobileNavRef.current && !mobileNavRef.current.contains(e.target)) {
        setMobileNavOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileNavOpen]);

  return (
    <div className="w-full max-w-screen overflow-x-hidden min-h-screen bg-white">
      {/* Fixed Top Nav */}
      <div className="w-full h-[10vh] max-md:w-screen fixed top-0 z-20 bg-white">
        <NavPapaPet />
      </div>

      <div
        className="w-full flex relative pt-[12vh] lg:pt-[10vh] overflow-hidden"
        style={{ minHeight: "calc(100vh - 10vh)" }}
      >
        {/* Sidebar for large screens */}
        <div className="hidden lg:block w-[200px] h-full z-10 border-r border-gray-600">
          <Sidebar activeIndex={activeIndex} setopen={setActiveIndex} />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center overflow-y-auto p-4 lg:p-5 w-full ">
          {/* Mobile Pill Navigation */}
          <div className="lg:hidden mb-4 w-5/6 relative z-10 flex items-center justify-center">
            <div className="w-5/6">
              <div
                className="bg-[#FFAD22] text-white font-bold px-6 py-2 rounded-2xl shadow-md cursor-pointer flex items-center justify-between select-none relative"
                onClick={() => setMobileNavOpen((open) => !open)}
                tabIndex={0}
                aria-haspopup="listbox"
                aria-expanded={mobileNavOpen}
              >
                <span>
                  {navItems[activeIndex]?.name || navItems[0].name}
                </span>
                <svg
                  className={`ml-2 w-4 h-4 transition-transform duration-200 ${mobileNavOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {mobileNavOpen && (
                <div
                  ref={mobileNavRef}
                  className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-neutral-200 z-20"
                >
                  {navItems.map((item, idx) => (
                    <div
                      key={item.path}
                      className={`px-6 py-3 cursor-pointer text-center font-semibold transition-colors ${
                        pathname?.startsWith(item.path)
                          ? "bg-[#FFAD22] text-white"
                          : "text-neutral-800 hover:bg-yellow-100"
                      } rounded-xl ${idx === navItems.length - 1 ? "" : "border-b border-neutral-100"}`}
                      onClick={() => {
                        setMobileNavOpen(false);
                        router.push(item.path);
                      }}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Page content */}
          {children}
        </div>
      </div>
    </div>
  );
}
