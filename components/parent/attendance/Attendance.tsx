"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";

export default function ParentAttendance() {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/attendance", { credentials: "include" })
      .then(res => res.json())
      .then(data => setAttendance(data.attendances || []))
      .finally(() => setLoading(false));
  }, []);

  const present = attendance.filter(a => a.status === "PRESENT").length;
  const absent = attendance.filter(a => a.status === "ABSENT").length;
  const late = attendance.filter(a => a.status === "LATE").length;

  if (loading) {
    return <div className="text-gray-500">Loading attendance...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Attendance</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Present" value={present} icon={<CheckCircle />} />
        <StatCard label="Absent" value={absent} icon={<XCircle />} />
        <StatCard label="Late" value={late} icon={<Clock />} />
      </div>

      {/* DAILY SCHEDULE */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-semibold mb-4">Today's Schedule</h2>

        <div className="space-y-3">
          {attendance.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="flex items-center justify-between bg-gray-50 rounded-xl p-4"
            >
              <div>
                <p className="font-medium">
                  Period {item.period}
                </p>
                <p className="text-sm text-gray-500">
                  {item.subject || "Class"}
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  item.status === "PRESENT"
                    ? "bg-green-100 text-green-700"
                    : item.status === "ABSENT"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {item.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Small Reusable Card ---------- */
function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between"
    >
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="text-green-500">{icon}</div>
    </motion.div>
  );
}
