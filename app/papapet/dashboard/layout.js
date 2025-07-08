"use client";

import NavPapaPet from "@/Components/Nav/NavPapaPet";
import Sidebar from "@/Components/Setting/Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    const index = navItems.findIndex((item) => pathname?.startsWith(item.path));
    setActiveIndex(index >= 0 ? index : 0);
  }, [pathname]);

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
        <div className="hidden lg:block w-[200px] h-full shadow-lg z-10">
          <Sidebar activeIndex={activeIndex} setopen={setActiveIndex} />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center overflow-y-auto bg-gray-50 p-4 lg:p-5 max-w-full">
          {/* Mobile Dropdown Navigation */}
          <div className="lg:hidden mb-4 w-3/4 max-w-xs relative z-10 flex items-center justify-center">
            <select
              className="appearance-none bg-[#FFAD22] text-white font-bold px-6 py-2 rounded-2xl w-3/4 shadow-md focus:outline-none"
              value={pathname}
              onChange={(e) => router.push(e.target.value)}
            >
              {navItems.map((item) => (
                <option
                  className="text-black bg-[#FFAD22] hover:bg-yellow-500"
                  key={item.path}
                  value={item.path}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Page content */}
          {children}
        </div>
      </div>
    </div>
  );
}
