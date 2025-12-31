import { useParentDashboardData } from "@/hooks/parent/useParentDashboard";
export default function ParentMarks() {
  const { marks } = useParentDashboardData();

  return (
    <div className="space-y-3">
      {marks.map((m) => (
        <div
          key={m.id}
          className="bg-white p-4 rounded-lg shadow"
        >
          <p className="font-semibold">{m.subject}</p>
          <p>
            {m.marks}/{m.totalMarks} – {m.grade}
          </p>
        </div>
      ))}
    </div>
  );
}
