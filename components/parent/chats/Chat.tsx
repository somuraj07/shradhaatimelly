import { useParentDashboardData } from "@/hooks/parent/useParentDashboard";

export default function ParentChat() {
  const { appointments } = useParentDashboardData();

  return (
    <div className="space-y-3">
      {appointments.map((a) => (
        <div
          key={a.id}
          className="bg-white p-4 rounded-lg shadow"
        >
          <p>Status: {a.status}</p>
          <p>{a.note}</p>
        </div>
      ))}
    </div>
  );
}
