"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Sidebar({menuItems}: {menuItems: {label: string; href: string}[]}) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white h-screen  px-4 py-6">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10 px-2">
        <div className="w-10 h-10 rounded-full bg-[#43b771] flex items-center justify-center text-white font-bold">
          T
        </div>
        <span className="text-xl font-semibold">timelly</span>
      </div>

      {/* Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition
                ${
                  active
                    ? "bg-[#43b771] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="absolute bottom-6 left-4 right-4">
        <button className="w-full text-left px-4 py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-100">
          Sign Out
        </button>
      </div>
    </aside>
  );
}
