import { FormField } from "@/interfaces/dashboard";

export const addWorkshopFields: FormField[] = [
  { name: "title", label: "Workshop Title", type: "text", placeholder: "Enter workshop title", required: true },
  { name: "description", label: "Description", placeholder: "Describe the workshop", type: "textarea" },
  { name: "endDate", label: "End Date", placeholder: "Select end date", type: "date" },
  {
    name: "targetClass",
    label: "Target Class",
    type: "select",
    options: [
      { label: "Class 1", value: "1" },
      { label: "Class 2", value: "2" },
    ],
  },
  { name: "image", label: "Workshop Image", type: "file" },
];
