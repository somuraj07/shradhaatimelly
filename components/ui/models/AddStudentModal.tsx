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
    email: "",
    fatherName: "",
    aadhaarNo: "",
    phoneNo: "",
    dob: "",
    address: "",
    totalFee: "",
    discountPercent: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [key]: e.target.value });
    };

  const validateForm = () => {
    if (!form.name.trim()) return "Student name is required";
    if (!form.fatherName.trim()) return "Father name is required";
    if (!form.aadhaarNo.trim()) return "Aadhaar number is required";
    if (!form.phoneNo.trim()) return "Phone number is required";
    if (!form.dob) return "Date of birth is required";
    if (!form.totalFee) return "Total fee is required";

    if (isNaN(Number(form.totalFee)) || Number(form.totalFee) <= 0) {
      return "Total fee must be a positive number";
    }

    if (
      form.discountPercent &&
      (isNaN(Number(form.discountPercent)) ||
        Number(form.discountPercent) < 0 ||
        Number(form.discountPercent) > 100)
    ) {
      return "Discount percent must be between 0 and 100";
    }

    return null;
  };

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/student/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email || undefined,
          fatherName: form.fatherName,
          aadhaarNo: form.aadhaarNo,
          phoneNo: form.phoneNo,
          dob: form.dob,
          classId,
          address: form.address || undefined,
          totalFee: Number(form.totalFee),
          discountPercent: form.discountPercent
            ? Number(form.discountPercent)
            : 0,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to add student");
        return;
      }

      toast.success("Student added successfully");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
          Add New Student
        </h2>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Student Name*"
            placeholder="Enter Name"
            value={form.name}
            onChange={handleChange("name")}
          />

          <InputField
            label="Email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange("email")}
          />

          <InputField
            label="Father Name*"
            placeholder="Enter Father name"
            value={form.fatherName}
            onChange={handleChange("fatherName")}
          />

          <InputField
            label="Aadhaar Number*"
            placeholder="Enter Adadhaar"
            value={form.aadhaarNo}
            onChange={handleChange("aadhaarNo")}
          />

          <InputField
            label="Phone Number*"
            placeholder="Enter Phone No"
            value={form.phoneNo}
            onChange={handleChange("phoneNo")}
          />

          <InputField
            label="Date of Birth*"
            placeholder="Select DOB"
            type="date"
            value={form.dob}
            onChange={handleChange("dob")}
          />

          <InputField
            label="Total Fee*"
            placeholder="Enter Total fee"
            value={form.totalFee}
            onChange={handleChange("totalFee")}
          />

          <InputField
            label="Discount (%)"
            placeholder="Enter discount"
            value={form.discountPercent}
            onChange={handleChange("discountPercent")}
          />
        </div>

        <div className="mt-4">
          <InputField
            placeholder="Enter Address"
            label="Address"
            value={form.address}
            onChange={handleChange("address")}
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ backgroundColor: MAIN_COLOR }}
          className="mt-6 w-full text-white py-3 rounded-xl font-medium disabled:opacity-60"
        >
          {loading ? "Adding Student..." : "Add Student"}
        </button>
      </div>
    </div>
  );
}
