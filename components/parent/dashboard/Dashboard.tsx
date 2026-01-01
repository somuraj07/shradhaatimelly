import { useParentDashboardData } from "@/hooks/parent/useParentDashboard";
import { motion } from "framer-motion";


export default function ParentDashboard() {
  const { loading, homeworks, attendanceRaw, events } =
    useParentDashboardData();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Stat title="Homework" value={homeworks.length} />
      <Stat title="Attendance Records" value={attendanceRaw.length} />
      <Stat title="Workshops" value={events.length} />
    </div>
  );
}

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-white p-6 shadow"
    >
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </motion.div>
  );
}
