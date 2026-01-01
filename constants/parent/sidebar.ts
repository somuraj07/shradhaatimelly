import {
  FiHome,
  FiBookOpen,
  FiCalendar,
  FiBarChart2,
  FiMessageCircle,
  FiAward,
  FiCreditCard,
  FiFileText,
  FiLogOut,
} from "react-icons/fi";

import { SidebarItem } from "@/constants/schooladmin/sidebar";

export const PARENT_MENU_ITEMS: SidebarItem[] = [
  {
    label: "Dashboard",
    tab: "dashboard",
    href: "/frontend/parent/dashboard",
    icon: FiHome,
  },
  {
    label: "Homework",
    tab: "homework",
    href: "/frontend/parent/dashboard?tab=homework",
    icon: FiBookOpen,
  },
  {
    label: "Attendance",
    tab: "attendance",
    href: "/frontend/parent/dashboard?tab=attendance",
    icon: FiCalendar,
  },
  {
    label: "Marks",
    tab: "marks",
    href: "/frontend/parent/dashboard?tab=marks",
    icon: FiBarChart2,
  },
  {
    label: "Teacher Chat",
    tab: "chat",
    href: "/frontend/parent/dashboard?tab=chat",
    icon: FiMessageCircle,
  },
  {
    label: "Workshops",
    tab: "workshops",
    href: "/frontend/parent/dashboard?tab=workshops",
    icon: FiAward,
  },
  {
    label: "Fees",
    tab: "fees",
    href: "/frontend/parent/dashboard?tab=fees",
    icon: FiCreditCard,
  },
  {
    label: "Certificates",
    tab: "certificates",
    href: "/frontend/parent/dashboard?tab=certificates",
    icon: FiFileText,
  },
  {
    label: "Logout",
    icon: FiLogOut,
    action: "logout",
  },
];
