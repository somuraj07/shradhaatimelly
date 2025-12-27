import { FormField } from "@/interfaces/dashboard";

export const addTeacherFields: FormField[] = [
  { name: "name", label: "Teacher Name", type: "text", placeholder: "Enter full name", required: true },
  { name: "email", label: "Email", type: "email", placeholder: "Enter email address", required: true },
  { name: "password", label: "Password", type: "password", placeholder: "Create a strong password", required: true },
  { name: "mobile", label: "Mobile Number", type: "number", placeholder: "Enter mobile number", },
];
