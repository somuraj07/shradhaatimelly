import { Calendar, Check, X } from "lucide-react";

export default function LeaveStats({
  pending,
  approved,
  rejected,
}: {
  pending: number;
  approved: number;
  rejected: number;
}) {
  const stats = [
    { label: "Pending Requests", value: pending, icon: Calendar },
    { label: "Approved", value: approved, icon: Check },
    { label: "Rejected", value: rejected, icon: X },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex justify-between items-center"
        >
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className="bg-white rounded-lg p-2">
            <Icon className="text-emerald-600" size={20} />
          </div>
        </div>
      ))}
    </div>
  );
}
