interface Transaction {
  id: string;
  schoolName: string;
}

export default function FeeTransactionsTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <div className="border rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-[#43b771]/20">
          <tr>
            <th className="py-3 text-center">Sl. No</th>
            <th className="text-left">Schools</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t, i) => (
            <tr key={t.id} className="border-t">
              <td className="py-3 text-center">
                {String(i + 1).padStart(2, "0")}
              </td>
              <td className="flex items-center gap-3 py-3">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <span className="text-gray-700">{t.schoolName}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
