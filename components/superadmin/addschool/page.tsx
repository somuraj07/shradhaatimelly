"use client";

export default function AddSchoolPage() {
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl p-8 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Add New School</h1>
        <div className="flex gap-3">
          <button className="text-gray-500">Cancel</button>
          <button className="text-gray-500">Reset</button>
          <button className="bg-green-500 text-white px-5 py-2 rounded-lg">
            Save
          </button>
        </div>
      </div>

      {/* Basic Information */}
      <Section title="Basic Information">
        <Input label="Admin Name" placeholder="Admin Name" />
        <Input label="Admin Role" placeholder="Admin Id" />
      </Section>

      {/* Contact Information */}
      <Section title="Contact Information">
        <div className="grid grid-cols-2 gap-6">
          <Input label="Phone" placeholder="Contact number" />
          <Input label="Email" placeholder="example@gmail.com" />
        </div>
      </Section>

      {/* Class Information */}
      <Section title="Class Information">
        <Input label="Class Range" placeholder="Class Range" />
        <Select label="Board" />
      </Section>

      {/* Address Details */}
      <Section title="Address Details">
        <div className="grid grid-cols-2 gap-6">
          <Input label="Address line" placeholder="Address line" />
          <Input label="Pincode" placeholder="Pincode" />
          <Input label="Area/Locality" placeholder="Area/Locality" />
          <Input label="City" placeholder="City" />
          <Input label="District" placeholder="District" />
          <Input label="State" placeholder="State" />
        </div>
      </Section>

      {/* Upload Logo */}
      <div className="mt-10 border-2 border-dashed rounded-xl p-10 flex flex-col items-center">
        <div className="w-14 h-14 border rounded-lg flex items-center justify-center mb-3">
          <span className="text-xl">+</span>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          Drop your Logo to upload
        </p>
        <button className="border px-4 py-1 rounded-md text-sm">
          Select files
        </button>
      </div>
    </div>
  );
}

/* ---------------- Reusable Components ---------------- */

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="mb-8">
      <h2 className="font-medium text-lg mb-4">{title}</h2>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

interface InputProps {
  label: string;
  placeholder: string;
}

function Input({ label, placeholder }: InputProps) {
  return (
    <div>
      <label className="block text-sm mb-1 text-gray-700">{label}</label>
      <input
        placeholder={placeholder}
        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
      />
    </div>
  );
}

interface SelectProps {
  label: string;
}

function Select({ label }: SelectProps) {
  return (
    <div>
      <label className="block text-sm mb-1 text-gray-700">{label}</label>
      <select className="w-full border rounded-lg px-4 py-2 bg-white">
        <option>Select Board</option>
        <option>CBSE</option>
        <option>ICSE</option>
        <option>State Board</option>
      </select>
    </div>
  );
}
