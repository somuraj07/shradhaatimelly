"use client";

import { Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type School = {
  id: string;
  name: string;
  adminCount: number;
  studentCount: number;
  createdAt: string;
};

export default function SchoolsListPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    fetchSchools();
  }, [page, search]);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/superadmin/schools?page=${page}&limit=${limit}&search=${search}`
      );
      const json = await res.json();

      if (json.success) {
        setSchools(json.data);
        setTotal(json.pagination.total);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Schools</h2>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search by School"
            className="pl-9 pr-4 py-2 border rounded-full text-sm outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden border rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-green-50">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">School Name</th>
              <th className="p-3 text-left">Admins</th>
              <th className="p-3 text-left">Students</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-center">Delete</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-400">
                  Loading schools...
                </td>
              </tr>
            ) : schools.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-400">
                  No schools found
                </td>
              </tr>
            ) : (
              schools.map((school) => (
                <tr key={school.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{school.id.slice(0, 6)}</td>
                  <td className="p-3 font-medium">{school.name}</td>
                  <td className="p-3">{school.adminCount}</td>
                  <td className="p-3">{school.studentCount}</td>
                  <td className="p-3">
                    {new Date(school.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-center">
                    <Trash2 className="text-gray-400 hover:text-red-500 cursor-pointer" size={16} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="border px-3 py-1 rounded-md disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="border px-3 py-1 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
