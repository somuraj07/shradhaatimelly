"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, CalendarDays } from "lucide-react";

type Transaction = {
  id: string;
  studentName: string;
  schoolName: string;
  amount: number;
  status: string;
  date: string;
};

export default function TransactionsListPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/superadmin/transactions");
      const json = await res.json();

      if (json.success) {
        setTransactions(json.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) =>
      t.schoolName.toLowerCase().includes(search.toLowerCase())
    );
  }, [transactions, search]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Fee Transactions</h2>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by School"
              className="pl-9 pr-4 py-2 border rounded-full text-sm outline-none"
            />
          </div>

          <button className="flex items-center gap-2 border px-3 py-2 rounded-full text-sm text-gray-600">
            <CalendarDays size={16} />
            Today
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="border rounded-xl overflow-hidden">
        <div className="bg-green-50 px-4 py-3 font-medium text-sm grid grid-cols-2">
          <span>Sl. No</span>
          <span>Schools</span>
        </div>

        {loading ? (
          <div className="p-6 text-center text-gray-400">
            Loading transactions...
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="p-6 text-center text-gray-400">
            No transactions found
          </div>
        ) : (
          filteredTransactions.map((t, index) => (
            <div
              key={t.id}
              className="grid grid-cols-2 px-4 py-3 border-t items-center hover:bg-gray-50"
            >
              <span className="text-sm text-gray-500">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {t.schoolName}
                </span>
                <span className="text-xs text-gray-400">
                  ₹{t.amount} • {t.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
