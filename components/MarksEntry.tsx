"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2 } from "lucide-react";

/* ================= TYPES ================= */

interface Class {
  id: string;
  name: string;
  section: string | null;
}

interface Student {
  id: string;
  user: { name: string | null };
}

interface Mark {
  id: string;
  subject: string;
  marks: number;
  totalMarks: number;
  grade: string | null;
  suggestions: string | null;
  createdAt: string;
  class: {
    id: string; name: string; section: string | null 
};
  teacher?: { name: string | null };
  student?: { id: string; user: { name: string | null } };
}

/* ================= PAGE ================= */

export default function MarksPage() {
  const { data: session, status } = useSession();
const [editingMarkId, setEditingMarkId] = useState<string | null>(null);

  const [classes, setClasses] = useState<Class[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [marks, setMarks] = useState<Mark[]>([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");

  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    subject: "",
    marks: "",
    totalMarks: "",
    suggestions: "",
  });

  /* ================= FETCH ================= */

  useEffect(() => {
    if (session) {
      fetchMarks();
      if (session.user.role === "TEACHER") fetchClasses();
    }
  }, [session, subjectFilter]);

  useEffect(() => {
    if (selectedClass) fetchStudents();
  }, [selectedClass]);

  const fetchClasses = async () => {
    const res = await fetch("/api/class/list");
    const data = await res.json();
    if (res.ok) setClasses(data.classes || []);
  };

  const fetchStudents = async () => {
    const res = await fetch(`/api/class/students?classId=${selectedClass}`);
    const data = await res.json();
    if (res.ok) setStudents(data.students || []);
  };

  const fetchMarks = async () => {
    setLoading(true);
    const url = subjectFilter
      ? `/api/marks/view?subject=${subjectFilter}`
      : "/api/marks/view";
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) setMarks(data.marks || []);
    setLoading(false);
  };

  /* ================= SUBMIT ================= */

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const payload = {
    classId: selectedClass,
    studentId: selectedStudent,
    subject: form.subject,
    marks: Number(form.marks),
    totalMarks: Number(form.totalMarks),
    suggestions: form.suggestions || null,
  };

  
  if (editingMarkId) {
  // Edit existing mark
  const res = await fetch(`/api/marks/${editingMarkId}`, { // correct REST route
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    fetchMarks();
    setShowAdd(false);
    resetForm();
  } else {
    const error = await res.json();
    alert(error.message || "Failed to update mark");
  }
} else {
  // Add new mark
  const res = await fetch("/api/marks/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (res.ok) {
    fetchMarks();
    setShowAdd(false);
    resetForm();
  } else {
    const error = await res.json();
    alert(error.message || "Failed to add mark");
  }
}

};

const resetForm = () => {
  setForm({ subject: "", marks: "", totalMarks: "", suggestions: "" });
  setSelectedClass("");
  setSelectedStudent("");
  setEditingMarkId(null);
};

const handleEdit = (mark: Mark) => {
  setEditingMarkId(mark.id);
  setSelectedClass(mark.class?.id || "");
  setSelectedStudent(mark.student?.id || "");
  setForm({
    subject: mark.subject,
    marks: mark.marks.toString(),
    totalMarks: mark.totalMarks.toString(),
    suggestions: mark.suggestions || "",
  });
  setShowAdd(true);
};

const handleDelete = async (markId: string) => {
  if (!confirm("Are you sure you want to delete this mark?")) return;

  const res = await fetch(`/api/marks/${markId}`, { // use markId
    method: "DELETE",
  });

  if (res.ok) {
    fetchMarks(); // refresh table
  } else {
    const error = await res.json();
    alert(error.message || "Failed to delete mark");
  }
};

  if (status === "loading") return <p className="p-6">Loading…</p>;
  if (!session) return <p className="p-6 text-red-600">Unauthorized</p>;

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 p-6">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">
          Marks Management
        </h1>

        {session.user.role === "TEACHER" && (
          <button
            onClick={() => setShowAdd(true)}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:scale-105 transition"
          >
            + Add Marks
          </button>
        )}
      </div>

      {/* FILTERS */}
      <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur rounded-2xl p-4 shadow mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          placeholder="Filter by Subject"
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="p-3 rounded-xl border"
        />

        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="p-3 rounded-xl border"
        >
          <option value="">All Classes</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} {c.section}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE */}
  {/* TABLE */}
<div className="max-w-7xl mx-auto bg-white/80 backdrop-blur rounded-3xl shadow-xl overflow-hidden">
  <div className="overflow-x-auto">
    <table className="w-full table-fixed border-collapse">
      <thead className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <tr>
          {session.user.role !== "STUDENT" && (
            <th className="px-4 py-4 text-left w-[14%]">Student</th>
          )}
          <th className="px-4 py-4 text-left w-[12%]">Subject</th>
          <th className="px-4 py-4 text-center w-[8%]">Marks</th>
          <th className="px-4 py-4 text-center w-[8%]">Total</th>
          <th className="px-4 py-4 text-center w-[8%]">Grade</th>
          <th className="px-4 py-4 text-left w-[12%]">Class</th>
          {session.user.role !== "STUDENT" && (
            <th className="px-4 py-4 text-left w-[12%]">Teacher</th>
          )}
          <th className="px-4 py-4 text-center w-[10%]">Date</th>
          {session.user.role !== "STUDENT" && (
            <th className="px-4 py-4 text-center w-[14%]">Actions</th>
          )}
        </tr>
      </thead>


{/* TABLE */}
<tbody className="divide-y divide-green-100">
  {marks.map((m) => (
    <tr key={m.id} className="hover:bg-green-50 transition">
      {session.user.role !== "STUDENT" && (
        <td className="px-4 py-3 font-medium truncate">{m.student?.user?.name}</td>
      )}
      <td className="px-4 py-3 truncate">{m.subject}</td>
      <td className="px-4 py-3 text-center font-semibold">{m.marks}</td>
      <td className="px-4 py-3 text-center">{m.totalMarks}</td>
      <td className="px-4 py-3 text-center">
        <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
          {m.grade || "N/A"}
        </span>
      </td>
      <td className="px-4 py-3 truncate">
        {m.class.name}
        {m.class.section && ` - ${m.class.section}`}
      </td>
      {session.user.role !== "STUDENT" && (
        <td className="px-4 py-3 truncate">{m.teacher?.name || "—"}</td>
      )}
      <td className="px-4 py-3 text-center text-sm text-gray-600">
        {new Date(m.createdAt).toLocaleDateString()}
      </td>
      {session.user.role !== "STUDENT" && (
        <td className="px-4 py-3 text-center flex justify-center gap-2">
  <button
    onClick={() => handleEdit(m)}
    className="p-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-xl transition"
  >
    <Edit2 size={16} />
  </button>
  <button
    onClick={() => handleDelete(m.id)}
    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition"
  >
    <Trash2 size={16} />
  </button>
</td>

      )}
    </tr>
  ))}
</tbody>

    </table>
  </div>
</div>



      {/* ADD MARKS MODAL */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-gradient-to-br from-white to-green-100 rounded-3xl shadow-2xl p-6 w-full max-w-md"
            >
              <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
                Add Marks
              </h2>

              <form onSubmit={handleSubmit} className="space-y-3">
                <select
                  required
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full p-3 rounded-xl border"
                >
                  <option value="">Select Class</option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.section}
                    </option>
                  ))}
                </select>

                <select
                  required
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full p-3 rounded-xl border"
                >
                  <option value="">Select Student</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.user.name}
                    </option>
                  ))}
                </select>

                <input
                  placeholder="Subject"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full p-3 rounded-xl border"
                />

                <input
                  type="number"
                  placeholder="Marks"
                  required
                  value={form.marks}
                  onChange={(e) => setForm({ ...form, marks: e.target.value })}
                  className="w-full p-3 rounded-xl border"
                />

                <input
                  type="number"
                  placeholder="Total Marks"
                  required
                  value={form.totalMarks}
                  onChange={(e) =>
                    setForm({ ...form, totalMarks: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border"
                />

                <textarea
                  placeholder="Suggestions"
                  value={form.suggestions}
                  onChange={(e) =>
                    setForm({ ...form, suggestions: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border"
                />

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAdd(false)}
                    className="flex-1 py-2 rounded-xl border text-green-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-green-600 text-white"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
