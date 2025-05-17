'use client';
import { useState } from 'react';
import { FaUser, FaHistory, FaTruck } from 'react-icons/fa';
import { FiShoppingCart, FiLogOut } from 'react-icons/fi';

const navItems = [
  { name: 'Profile', icon: FaUser, index: 0 },
  { name: 'Order History', icon: FaHistory, index: 1 },
  { name: 'Track Order', icon: FaTruck, index: 2 },
  { name: 'Shopping Cart', icon: FiShoppingCart, index: 3 },
  { name: 'LogOut', icon: FiLogOut, index: 4 },
];

export default function Sidebar({ setopen, activeIndex }) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleClick = (index, name) => {
    if (name === 'LogOut') {
      // Handle logout logic here
      console.log('User logged out');
      return;
    }
    setopen(index);
    setOpenSidebar(false); // Close sidebar on mobile after selection
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden px-4 py-2 bg-white shadow z-20">
        <button
          onClick={() => setOpenSidebar(true)}
          aria-label="Open menu"
          className="text-xl text-gray-700"
        >
          ☰ Menu
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
        />
      )}

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out 
        ${openSidebar ? 'translate-x-0' : '-translate-x-full'} md:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={() => setOpenSidebar(false)}
            aria-label="Close menu"
            className="text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        <nav className="px-4 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isLogout = item.name === 'LogOut';
            const isActive = activeIndex === item.index && !isLogout;

            return (
              <button
                key={item.name}
                onClick={() => handleClick(item.index, item.name)}
                className={`flex w-full items-center gap-3 px-4 py-2 my-1 rounded-md transition
                  ${isActive ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-orange-200'}`}
              >
                <Icon className="text-lg" />
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar for Desktop */}
      <div className="hidden md:block fixed  mt-[2%] w-[13%] h-[calc(100vh-10vh)] bg-white shadow-sm border-r">
        <nav className="px-4 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isLogout = item.name === 'LogOut';
            const isActive = activeIndex === item.index && !isLogout;

            return (
              <button
                key={item.name}
                onClick={() => handleClick(item.index, item.name)}
                className={`flex w-full items-center gap-3 px-4 py-2 my-6 rounded-md transition
                  ${isActive ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-orange-200'}`}
              >
                <Icon className="text-lg" />
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}
