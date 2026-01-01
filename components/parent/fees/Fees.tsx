import { useParentDashboardData } from "@/hooks/parent/useParentDashboard";

export default function ParentFees() {
  const { fees } = useParentDashboardData();

  if (!fees) return <p>No fee data</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p>Total Fee: ₹{fees.totalFee}</p>
      <p>Paid: ₹{fees.amountPaid}</p>
      <p>Remaining: ₹{fees.remainingFee}</p>
    </div>
  );
}
