"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useSearchParams } from "next/navigation";

import SchoolAdminSideBar from "@/components/layout/SchoolAdminSideBar";
import { SCHOOLADMIN_MENU_ITEMS } from "@/constants/schooladmin/sidebar";
import DashboardTab from "@/components/schooladmin/dashboard/page";
import { useDashboardData } from "@/hooks/useSchoolAdminDashboard";
import TeachersPage from "@/components/schooladmin/teachers/page";
import SchoolAdminClassesPage from "@/components/schooladmin/classes/page";
import StudentsManagementPage from "@/components/schooladmin/studentsManagement/page";
import TeacherLeavesPage from "@/components/schooladmin/teachersleaves/page";
import WorkshopsPage from "@/components/schooladmin/workshops/page";

export default function SchoolAdminLayout() {
  const [open, setOpen] = useState(false);
  const tab = useSearchParams().get("tab") ?? "dashboard";
  const {
  loading,
  stats,
  attendance,
  students,
  teacherLeaves,
  teacherPendingLeaves,
  classes,
  error,
  events,
  news,
  teachers,
  reloadDashboard,
  reloadClasses,
  reloadStudents,
  reloadTeachers,
  reloadLeaves,
} = useDashboardData();

  const renderPage = () => {
    switch (tab) {
      case "students":
        return <StudentsManagementPage 
        classes={classes} 
        reload={reloadStudents} />;
      case "classes":
        return <SchoolAdminClassesPage
          teachers={teachers}
          loadingTeachers={loading}
          reload={reloadClasses}
        />;
      case "teachers":
        return <TeachersPage teachers={teachers} reload={reloadTeachers} loading={loading} />;
      case "teacher-leaves":
        return <TeacherLeavesPage allLeaves={teacherLeaves} pending={teacherPendingLeaves} loading={loading} reload={reloadLeaves} />;
      case "workshops":
        return <WorkshopsPage workshops={events} loading={loading} reload={reloadDashboard} />;
      default:
        return (
          <DashboardTab
            loading={loading}
            stats={stats}
            attendance={attendance}
            workshops={events}
            news={news}
            reload={reloadDashboard}
            error={error}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 animate-dashboard-container bg-[#f8fafc] min-h-screen">
      {/* ========== DESKTOP SIDEBAR ========== */}
      <aside className="hidden md:block">
        <SchoolAdminSideBar menuItems={SCHOOLADMIN_MENU_ITEMS} />
      </aside>

      {/* ========== MOBILE SIDEBAR DRAWER ========== */}
      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-64 bg-white shadow-lg">
            <SchoolAdminSideBar
              menuItems={SCHOOLADMIN_MENU_ITEMS}
              onClose={() => setOpen(false)}
            />
          </div>

          {/* Overlay */}
          <div className="flex-1 bg-black/40" onClick={() => setOpen(false)} />
        </div>
      )}

      {/* ========== MAIN CONTENT ========== */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Top Bar */}
        <div className="md:hidden flex items-center gap-3 p-4 bg-white shadow-sm">
          <button onClick={() => setOpen(true)}>
            <Menu />
          </button>
          <h1 className="font-semibold">Admin Panel</h1>
        </div>

        {/* Page Content */}
        <main className="p-4 md:p-6 flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
