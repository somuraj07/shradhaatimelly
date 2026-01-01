"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useSearchParams } from "next/navigation";

import SchoolAdminSideBar from "@/components/layout/SchoolAdminSideBar";
import { PARENT_MENU_ITEMS } from "@/constants/parent/sidebar";
import ParentHomework from "@/components/parent/homework/Homework";
import ParentAttendance from "@/components/parent/attendance/Attendance";
import ParentDashboard from "@/components/parent/dashboard/Dashboard";
import { useParentDashboardData } from "@/hooks/parent/useParentDashboard";

/* Parent pages */

export default function ParentDashboardLayout() {
  const [open, setOpen] = useState(false);
  const tab = useSearchParams().get("tab") ?? "dashboard";
  
  const {attendanceStats}=useParentDashboardData();

  const renderPage = () => {
    switch (tab) {
      case "homework":
        return <ParentHomework />;
      case "attendance":
        return <ParentAttendance attendanceStats={attendanceStats} />;
    //   case "marks":
    //     return <ParentMarks />;
    //   case "chat":
    //     return <ParentChat />;
    //   case "workshops":
    //     return <ParentWorkshops />;
    //   case "fees":
    //     return <ParentFees />;
    //   case "certificates":
    //     return <ParentCertificates />;
      default:
        return <ParentDashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      
      {/* ===== DESKTOP SIDEBAR ===== */}
      <aside className="hidden md:block">
        <SchoolAdminSideBar menuItems={PARENT_MENU_ITEMS} />
      </aside>

      {/* ===== MOBILE SIDEBAR ===== */}
      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-64 bg-white shadow-lg">
            <SchoolAdminSideBar
              menuItems={PARENT_MENU_ITEMS}
              onClose={() => setOpen(false)}
            />
          </div>
          <div
            className="flex-1 bg-black/40"
            onClick={() => setOpen(false)}
          />
        </div>
      )}

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Top Bar */}
        <div className="md:hidden flex items-center gap-3 p-4 bg-white shadow-sm">
          <button onClick={() => setOpen(true)}>
            <Menu />
          </button>
          <h1 className="font-semibold">Parent Portal</h1>
        </div>

        <main className="p-4 md:p-6 flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
