import { useParentDashboardData } from "@/hooks/parent/useParentDashboard";

export default function ParentCertificates() {
  const { certificates } = useParentDashboardData();

  return (
    <div className="space-y-3">
      {certificates.map((c) => (
        <div
          key={c.id}
          className="bg-white p-4 rounded-lg shadow"
        >
          <p className="font-semibold">{c.title}</p>
          <p className="text-sm text-gray-500">
            Issued by {c.issuedBy?.name}
          </p>
        </div>
      ))}
    </div>
  );
}
