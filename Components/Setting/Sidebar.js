'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FaUser, FaHistory, FaTruck, FaShoppingCart, FaCog, FaSignOutAlt } from 'react-icons/fa';

const navItems = [
  { name: 'Profile', icon: FaUser, path: '/papapet/profile' },
  { name: 'Order History', icon: FaHistory, path: '/papapet/orders' },
  { name: 'Track Order', icon: FaTruck, path: '/papapet/track' },
  { name: 'Shopping Cart', icon: FaShoppingCart, path: '/papapet/cart' },
  { name: 'Setting', icon: FaCog, path: '/papapet/settings' },
  { name: 'Log-out', icon: FaSignOutAlt, path: '/papapet/logout' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Set 'open' to true if we are on the profile page
  useEffect(() => {
    if (pathname === '/papapet/profile') {
      setOpen(true);
    }
  }, [pathname]);

  return (
    <div className="md:w-64 w-full bg-white border-r min-h-screen shadow-sm fixed md:static z-50">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 md:hidden">
        {/* <h2 className="text-lg font-semibold text-blue-600">PaPaPet</h2> */}
        <button onClick={() => setOpen(!open)} className="text-gray-600 text-2xl">
          ☰
        </button>
      </div>

      {/* Navigation Items */}
      <nav className={`md:block ${open ? 'block' : 'hidden'} px-4 py-2`}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-2 my-1 rounded-md transition ${
                isActive ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-orange-200'
              }`}
            >
              <Icon className={`text-lg ${isActive ? 'text-white' : 'text-gray-700'}`} />
              <span className="text-sm font-medium">{item.name}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
