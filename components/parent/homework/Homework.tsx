"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";

export default function ParentHomework() {
  const [homeworks, setHomeworks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/homeworks/list", { credentials: "include" })
      .then(res => res.json())
      .then(data => setHomeworks(data.homeworks || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-gray-500">Loading homework...</div>;
  }

  if (!homeworks.length) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No homework assigned 🎉
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Homework</h1>

      <div className="space-y-4">
        {homeworks.map((hw, index) => (
          <motion.div
            key={hw.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >
            {/* Subject + Status */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                {hw.subject}
              </span>

              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  hw.hasSubmitted
                    ? "bg-gray-200 text-gray-600"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {hw.hasSubmitted ? "Submitted" : "Pending"}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-semibold text-gray-900">
              {hw.title}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {hw.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar size={16} />
                Due: {new Date(hw.dueDate).toLocaleDateString()}
              </div>

              {!hw.hasSubmitted && (
                <button className="px-4 py-2 text-sm rounded-lg bg-green-500 text-white hover:bg-green-600 transition">
                  Submit
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
