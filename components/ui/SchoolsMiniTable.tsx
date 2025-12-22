interface School {
  id: string;
  name: string;
  studentCount: number;
}

export default function SchoolsMiniTable({
  schools,
}: {
  schools: School[];
}) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-gray-500">
          <th className="text-left py-2">#</th>
          <th className="text-left">Name</th>
          <th className="text-right">Total No. of Students</th>
        </tr>
      </thead>

      <tbody>
        {schools.map((s, i) => (
          <tr key={s.id} className="border-t">
            <td className="py-3">{String(i + 1).padStart(2, "0")}</td>
            <td>{s.name}</td>
            <td className="text-right">
              <span className="px-3 py-1 rounded-full bg-[#43b771]/20 text-xs">
                {s.studentCount}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
