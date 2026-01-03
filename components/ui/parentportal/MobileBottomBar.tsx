"use client";

import { FiHome, FiBookOpen, FiCalendar, FiCreditCard, FiMoreHorizontal } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function MobileBottomNav({ onMore }: { onMore: () => void }) {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-300 flex justify-around py-2 z-40">
      <Nav icon={<FiHome />} label="Home" onClick={() => router.push("/frontend/parent/dashboard")} />
      <Nav icon={<FiBookOpen />} label="Homework" onClick={() => router.push("?tab=homework")} />
      <Nav icon={<FiCalendar />} label="Attendance" onClick={() => router.push("?tab=attendance")} />
      <Nav icon={<FiCreditCard />} label="Fees" onClick={() => router.push("?tab=fees")} />
      <Nav icon={<FiMoreHorizontal />} label="More" onClick={onMore} />
    </div>
  );
}

function Nav({ icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="flex flex-col items-center text-xs text-gray-600">
      <div className="text-lg">{icon}</div>
      {label}
    </button>
  );
}
