"use client";

import { useState } from "react";
import { toast } from "@/services/toast/toast.service";
import { MAIN_COLOR } from "@/constants/colors";
import InputField from "../common/InputField";

interface Props {
  classId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddStudentModal({
  classId,
  onClose,
  onSuccess,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    dob: "",
    age: "",
    gender: "",
    parentName: "",
    phoneNo: "",
    email: "",
    address: "",
    previousSchool: "",
    aadharNo: "",
    totalFee: "",
    discount: "",
  });

  const handleChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [key]: e.target.value });
    };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/student/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, classId }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to add student");
        return;
      }

      toast.success("Student added successfully");
      onSuccess();
    } catch (err) {
      toast.error("Failed to add student");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-black"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold mb-6">
          Add New Student to Class
        </h2>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Name*"
            placeholder="Enter student name"
            value={form.name}
            onChange={handleChange("name")}
          />

          <InputField
            label="Roll Number*"
            placeholder="Enter roll number"
            value={form.rollNo}
            onChange={handleChange("rollNo")}
          />

          <InputField
            label="Date of Birth"
            type="date"
            placeholder="mm/dd/yyyy"
            value={form.dob}
            onChange={handleChange("dob")}
          />

          <InputField
            label="Age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange("age")}
          />

          <InputField
            label="Gender"
            placeholder="Select gender"
            value={form.gender}
            onChange={handleChange("gender")}
          />

          <InputField
            label="Parent Name"
            placeholder="Parent name"
            value={form.parentName}
            onChange={handleChange("parentName")}
          />

          <InputField
            label="Parent Contact"
            placeholder="Phone number"
            value={form.phoneNo}
            onChange={handleChange("phoneNo")}
          />

          <InputField
            label="Email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange("email")}
          />
        </div>

        {/* Full width fields */}
        <div className="mt-4 space-y-4">
          <InputField
            label="Address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange("address")}
          />

          <InputField
            label="Previous School Attended"
            placeholder="Previous school"
            value={form.previousSchool}
            onChange={handleChange("previousSchool")}
          />
        </div>

        {/* Footer Button */}
        <button
          onClick={handleSubmit}
          style={{ backgroundColor: MAIN_COLOR }}
          className="mt-6 w-full text-white py-3 rounded-xl font-medium"
        >
          Add Student
        </button>
      </div>
    </div>
  );
}
