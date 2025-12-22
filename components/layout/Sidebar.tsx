"use client";

import { MAIN_COLOR } from "@/constants/colors";
import { IMenuItem } from "@/interfaces/dashboard";
import { useRouter, useSearchParams } from "next/navigation";
import BrandLogo from "../ui/common/BrandLogo";

export default function Sidebar({ menuItems }: { menuItems: IMenuItem[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "dashboard";

  return (
    <aside className="w-64 bg-white">
      {menuItems.map((item) => {
        const itemTab = new URLSearchParams(item.href.split("?")[1]).get("tab") || "dashboard";
        const isActive = itemTab === activeTab;

        return (
          <button
            key={item.href}
            onClick={() => router.push(item.href)}
            style={isActive ? styles.activeTab : undefined}
            className={`w-full text-left px-4 py-3 transition ${!isActive ? "hover:bg-gray-100 rounded-lg cursor-pointer" : ""}`}
          >
            {item.label}
          </button>
        );
      })}
    </aside>
  );
}

const styles={
  activeTab:{
    backgroundColor: `${MAIN_COLOR}`,
    color: `white`,
    fontWeight: `600`,
    borderRadius: `10px`,
  } ,
}
