"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/ui/StatCard";
import SectionCard from "@/components/ui/common/SectionCard";
import SchoolsMiniTable from "@/components/ui/SchoolsMiniTable";
import FeeTransactionsTable from "@/components/ui/FeeTransactionsTable";
import { SUPERADMIN_SIDEBAR_ITEMS } from "@/constants/superadmin/sidebar";
import Sidebar from "@/components/layout/Sidebar";
import TopNavbar from "@/components/layout/TopNavbar";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalSchools: 0,
    totalStudents: 0,
  });
  const [schools, setSchools] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("/api/superadmin/dashboard")
      .then((r) => r.json())
      .then((r) => setStats(r.data));

    fetch("/api/superadmin/schools?limit=4")
      .then((r) => r.json())
      .then((r) => setSchools(r.data));

    fetch("/api/superadmin/transactions")
      .then((r) => r.json())
      .then((r) => setTransactions(r.data.slice(0, 8)));
  }, []);

  return (

    <div className="flex">
      <Sidebar menuItems={SUPERADMIN_SIDEBAR_ITEMS} />
      <div className="flex-1">
        <TopNavbar />
           <div className="p-6 bg-[#f8fafc] min-h-screen">
  
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* LEFT */}
        <div className="space-y-6">
          <StatCard title="Total No. of Schools" value={stats.totalSchools} />
          <StatCard
            title="Total No. of Students"
            value={stats.totalStudents}
            iconBg="bg-purple-500"
          />
          <SectionCard title="Schools">
            <SchoolsMiniTable schools={schools} />
          </SectionCard>
        </div>

        {/* RIGHT */}
        <SectionCard title="Fee Transactions">
          <FeeTransactionsTable transactions={transactions} />
        </SectionCard>
      </div>
    </div>
      </div>
    </div>
 
  );
}
