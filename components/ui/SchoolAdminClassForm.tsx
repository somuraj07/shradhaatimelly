"use client";

import { useEffect, useState } from "react";
import InputField from "@/components/ui/common/InputField";
import SelectField from "@/components/ui/common/SelectField";
import { MAIN_COLOR } from "@/constants/colors";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { toast } from "@/services/toast/toast.service";

interface Teacher {
  id: string;
  name: string;
}

/* ---------------- Animation Variants ---------------- */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { x: -60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function CreateClassForm() {
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loadingTeachers, setLoadingTeachers] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [fieldErrors, setFieldErrors] = useState<{
    className?: string;
    section?: string;
    teacherId?: string;
  }>({});

  /* ---------------- Fetch Teachers ---------------- */
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoadingTeachers(true);
        const res = await fetch("/api/teacher/list");

        if (!res.ok) throw new Error("Failed to fetch teachers");

        const data = await res.json();
        setTeachers(data.teachers || []);
      } catch (err) {
        console.error("Fetch teachers error:", err);
      } finally {
        setLoadingTeachers(false);
      }
    };

    fetchTeachers();
  }, []);

  /* ---------------- Validation ---------------- */
  const validateForm = () => {
    const errors: typeof fieldErrors = {};

    if (!className.trim()) errors.className = "Class name is required";
    if (!section.trim()) errors.section = "Section is required";
    if (!teacherId) errors.teacherId = "Class teacher is required";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* ---------------- Submit ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const res = await fetch("/api/class/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: className,
          section,
          teacherId,
        }),
      });

      const data = await res.json();

      if (data.status!==201) {
        toast.error(data.message || "Failed to create class");
        return;
      }

      setSuccess("Class created successfully");
      toast.success("Class created successfully");
      setClassName("");
      setSection("");
      setTeacherId("");
      setFieldErrors({});
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <motion.form
          onSubmit={handleSubmit}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto w-full max-w-2xl bg-white rounded-2xl p-6 space-y-6 shadow-md"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-lg">▦</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Class Information</h2>
                <p className="text-sm text-gray-500">
                  Enter the details for the new class
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="border-t border-gray-200" />
          </motion.div>

          {/* Class Name */}
          <motion.div variants={itemVariants}>
            <InputField
              label="Class Name *"
              placeholder="e.g., Class 10"
              value={className}
              onChange={(e) => {
                setClassName(e.target.value);
                setFieldErrors((p) => ({ ...p, className: undefined }));
              }}
            />
            {fieldErrors.className && (
              <p className="text-sm text-red-600">{fieldErrors.className}</p>
            )}
          </motion.div>

          {/* Section */}
          <motion.div variants={itemVariants}>
            <InputField
              label="Section *"
              placeholder="e.g., A, B, C"
              value={section}
              onChange={(e) => {
                setSection(e.target.value);
                setFieldErrors((p) => ({ ...p, section: undefined }));
              }}
            />
            {fieldErrors.section && (
              <p className="text-sm text-red-600">{fieldErrors.section}</p>
            )}
          </motion.div>

          {/* Teacher */}
          <motion.div variants={itemVariants}>
            <SelectField
              label="Assign Class Teacher *"
              value={teacherId}
              onChange={(e) => {
                setTeacherId(e.target.value);
                setFieldErrors((p) => ({ ...p, teacherId: undefined }));
              }}
              placeholder={
                loadingTeachers ? "Loading teachers..." : "Select a teacher"
              }
              options={teachers.map((t) => ({
                name: t.name,
                id: t.id,
              }))}
            />
            {fieldErrors.teacherId && (
              <p className="text-sm text-red-600">{fieldErrors.teacherId}</p>
            )}
          </motion.div>

          {/* API Error */}
          {error && (
            <motion.p
              variants={itemVariants}
              className="text-sm text-red-600 text-center font-medium"
            >
              {error}
            </motion.p>
          )}

        {/* {success && (
          <motion.p
            variants={itemVariants}
            className="text-sm text-green-600 text-center font-medium"
          >
            {success}
          </motion.p>
        )} */}


          {/* Submit */}
          <motion.div variants={itemVariants}>
            <button
              type="submit"
              disabled={submitting}
              style={{ backgroundColor: MAIN_COLOR }}
              className={`w-full py-3 rounded-xl text-white font-medium ${
                submitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? "Creating..." : "Create Class"}
            </button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
}
