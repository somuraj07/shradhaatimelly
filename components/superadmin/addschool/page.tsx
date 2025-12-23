"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/ui/common/InputField";
import SelectField from "@/components/ui/common/SelectField";
import FormSection from "@/components/ui/common/FormSection";
import SuccessPopup from "@/components/ui/common/SuccessPopup";
import { EDUCATION_BOARDS } from "@/constants/boards";
import { MAIN_COLOR } from "@/constants/colors";
import { SchoolFormState } from "@/interfaces/dashboard";

export default function AddSchoolPage() {
  const router = useRouter();

  const [form, setForm] = useState<SchoolFormState>({
    schoolName: "",
    password: "",
    phone: "",
    email: "",
    classRange: "",
    board: "",
    addressLine: "",
    pincode: "",
    area: "",
    city: "",
    district: "",
    state: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  /* -------- Logo Upload -------- */
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  /* -------- Input Handler -------- */
  const handleChange =
    (field: keyof SchoolFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  /* -------- Submit Handler -------- */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.schoolName,
          email: form.email,
          password: form.password,
          role: "SCHOOLADMIN",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      // ✅ Show success popup
      setShowSuccess(true);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({
      schoolName: "",
      password: "",
      phone: "",
      email: "",
      classRange: "",
      board: "",
      addressLine: "",
      pincode: "",
      area: "",
      city: "",
      district: "",
      state: "",
    });
    setLogoFile(null);
  };

  return (
    <>
      <form
        onSubmit={handleSignup}
        className="max-w-6xl mx-auto bg-white rounded-2xl p-8 shadow-sm"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Add New School</h1>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="text-gray-500"
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: MAIN_COLOR }}
              className="
                text-white
                px-6
                py-2
                rounded-lg
                font-medium
                hover:opacity-90
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Basic Information */}
        <FormSection title="Basic Information">
          <InputField
            label="School Name"
            placeholder="School Name"
            value={form.schoolName}
            onChange={handleChange("schoolName")}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange("password")}
          />
        </FormSection>

        {/* Contact Information */}
        <FormSection title="Contact Information">
          <div className="grid grid-cols-2 gap-6">
            <InputField
              label="Phone"
              placeholder="Contact number"
              value={form.phone}
              onChange={handleChange("phone")}
            />
            <InputField
              label="Email"
              type="email"
              placeholder="example@gmail.com"
              value={form.email}
              onChange={handleChange("email")}
            />
          </div>
        </FormSection>

        {/* Class Information */}
        <FormSection title="Class Information">
          <div className="grid grid-cols-2 gap-6">
            <InputField
              label="Class Range"
              placeholder="Class Range"
              value={form.classRange}
              onChange={handleChange("classRange")}
            />
            <SelectField
              label="Board of Education"
              value={form.board}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, board: e.target.value }))
              }
              options={EDUCATION_BOARDS}
              placeholder="Select Board"
            />
          </div>
        </FormSection>

        {/* Address Details */}
        <FormSection title="Address Details">
          <div className="grid grid-cols-2 gap-6">
            <InputField
              label="Address Line"
              placeholder="Address line"
              value={form.addressLine}
              onChange={handleChange("addressLine")}
            />
            <InputField
              label="Pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange("pincode")}
            />
            <InputField
              label="Area / Locality"
              placeholder="Area / Locality"
              value={form.area}
              onChange={handleChange("area")}
            />
            <InputField
              label="City"
              placeholder="City"
              value={form.city}
              onChange={handleChange("city")}
            />
            <InputField
              label="District"
              placeholder="District"
              value={form.district}
              onChange={handleChange("district")}
            />
            <InputField
              label="State"
              placeholder="State"
              value={form.state}
              onChange={handleChange("state")}
            />
          </div>
        </FormSection>

        {/* Upload Logo */}
        <div className="mt-10 border-2 border-dashed rounded-xl p-10 flex flex-col items-center">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="w-14 h-14 border rounded-lg flex items-center justify-center mb-3">
            <span className="text-xl">+</span>
          </div>

          <p className="text-sm text-gray-600 mb-2">
            {logoFile
              ? `Selected file: ${logoFile.name}`
              : "Drop your Logo to upload"}
          </p>

          <button
            type="button"
            onClick={handleFileSelect}
            className="border px-4 py-1 rounded-md text-sm hover:bg-gray-100"
          >
            Select files
          </button>
        </div>
      </form>

      {/* ✅ Success Popup */}
      <SuccessPopup
        open={showSuccess}
        title="School Created Successfully!"
        onClose={() => {
          setShowSuccess(false);
          handleReset();
        }}
      />
    </>
  );
}
