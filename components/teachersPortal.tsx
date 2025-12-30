"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ClipboardList,
  CalendarCheck,
  Calendar,
  FileText,
  Megaphone,
  BookOpen,
  Newspaper,
  MessageSquare,
  Menu,
  X,
} from "lucide-react"

import RequireRole from "./RequireRole"
import MarksEntryPage from "./MarksEntry"
import MarkAttendancePage from "./AtendMark"
import ViewAttendancePages from "@/app/attendance/view/page"
import CertificatesPage from "./Certificates"
import HomeworkPage from "./Homework"
import NewsFeedPage from "./NewsFeed"
import EventsPage from "./Events"
import CommunicationPage from "@/app/communication/page"
import TeacherLeavesPage from "./teacherLeave"
import TeacherDashboard from "./teacherDashboard"

/* ---------------- USER (DISPLAY ONLY) ---------------- */
const user = {
  name: "Soma Sankar",
  role: "TEACHER",
}

/* ---------------- SIDEBAR ACTIONS ---------------- */

const actions = [
  { id: "dashboard", label: "Dashboard", icon: Megaphone },
  { id: "marks-entry", label: "Marks", icon: ClipboardList },
  { id: "attendance-mark", label: "Attendance Mark", icon: CalendarCheck },
  { id: "certificates", label: "Certificates", icon: FileText },
  { id: "events", label: "Events", icon: Megaphone },
  { id: "homework", label: "Homeworks", icon: BookOpen },
  { id: "newsfeed", label: "News Feed", icon: Newspaper },
  { id: "communication", label: "Communication", icon: MessageSquare },
  { id: "leaves", label: "Leaves Management", icon: Calendar },
]

/* ---------------- MAIN PAGE ---------------- */

export default function TeachersPage() {
  const [active, setActive] = useState(actions[0])
  const [mobileOpen, setMobileOpen] = useState(false)

  const Sidebar = ({ mobile = false }) => (
    <aside
      className={`${
        mobile ? "w-72" : "hidden md:flex w-80"
      } flex-col justify-between bg-white border-r border-[#33b663]/20 shadow-lg h-full`}
    >
      {/* TOP */}
      <div>
        <div className="p-6 border-b border-[#33b663]/20 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#33b663]">
            🎓 Teacher Panel
          </h1>
          {mobile && (
            <button onClick={() => setMobileOpen(false)}>
              <X />
            </button>
          )}
        </div>

        <nav className="p-4 space-y-2">
          {actions.map((item) => {
            const Icon = item.icon
            const isActive = active.id === item.id

            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setActive(item)
                  setMobileOpen(false)
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition
                  ${
                    isActive
                      ? "bg-[#33b663] text-white shadow-md"
                      : "text-gray-700 hover:bg-[#e9f7f0]"
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            )
          })}
        </nav>
      </div>

      {/* BOTTOM PROFILE */}
      <div className="p-4 border-t border-[#33b663]/20">
        <div className="flex items-center gap-4 bg-[#f2fbf6] rounded-2xl p-4">
          {/* Avatar */}
          <div className="h-12 w-12 rounded-full bg-[#33b663] text-white flex items-center justify-center text-xl font-bold shadow">
            {user.name.charAt(0)}
          </div>

          {/* Info */}
          <div className="flex-1">
            <p className="font-semibold text-gray-800 leading-tight">
              {user.name}
            </p>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#33b663]/10 text-[#33b663]">
              {user.role}
            </span>
          </div>
        </div>
      </div>
    </aside>
  )

  return (
    <div className="flex min-h-screen bg-[#f7faf9]">
      {/* DESKTOP SIDEBAR */}
      <Sidebar />

      {/* MOBILE NAVBAR */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#33b663]/20 shadow-sm flex items-center justify-between px-4 py-3">
        <button onClick={() => setMobileOpen(true)}>
          <Menu />
        </button>
        <h2 className="font-semibold text-[#33b663]">
          {active.label}
        </h2>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              className="fixed inset-y-0 left-0 z-50"
            >
              <Sidebar mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <main className="flex-1 pt-14 md:pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full bg-white"
          >
            {renderContent(active.id)}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

/* ---------------- CONTENT RENDERER ---------------- */

function renderContent(section: string) {
  switch (section) {
    case "dashboard":
      return <Dashboard />
    case "marks-entry":
      return <MarksEntry />
    case "attendance-mark":
      return <AttendanceMark />
    case "attendance-view":
      return <AttendanceView />
    case "certificates":
      return <Certificate />
    case "homework":
      return <Homework />
    case "newsfeed":
      return <Newsfeed />
    case "events":
      return <Events />
    case "communication":
      return <Communication />
    case "leaves":
      return <Leaves />
    default:
      return <ComingSoon />
  }
}

/* ---------------- PAGE WRAPPERS ---------------- */

function Dashboard() {
  return (
    <RequireRole allowedRoles={["TEACHER"]}>
      <TeacherDashboard />
    </RequireRole>
  )
}

function MarksEntry() {
  return (
    <RequireRole allowedRoles={["TEACHER"]}>
      <MarksEntryPage />
    </RequireRole>
  )
}

function AttendanceMark() {
  return (
    <RequireRole allowedRoles={["TEACHER"]}>
      <MarkAttendancePage />
    </RequireRole>
  )
}

function AttendanceView() {
  return (
    <RequireRole allowedRoles={["TEACHER"]}>
      <ViewAttendancePages />
    </RequireRole>
  )
}

function Certificate() {
  return (
    <RequireRole allowedRoles={["TEACHER"]}>
      <CertificatesPage />
    </RequireRole>
  )
}

function Homework() {
  return (
    <RequireRole allowedRoles={["TEACHER"]}>
      <HomeworkPage />
    </RequireRole>
  )
}

function Newsfeed() {
  return (
    <RequireRole allowedRoles={["TEACHER"]}>
      <NewsFeedPage />
    </RequireRole>
  )
}

function Events() {
  return (
    <RequireRole allowedRoles={["TEACHER"]}>
      <EventsPage />
    </RequireRole>
  )
}

function Communication() {
  return (
    <RequireRole allowedRoles={["TEACHER"]}>
      <CommunicationPage />
    </RequireRole>
  )
}

function Leaves() {
  return (
    <RequireRole allowedRoles={["TEACHER"]}>
      <TeacherLeavesPage />
    </RequireRole>
  )
}

function ComingSoon() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <p className="text-gray-500">🚧 Feature under development</p>
    </div>
  )
}
