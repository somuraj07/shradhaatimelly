import { FormField } from "@/interfaces/dashboard";

export const createPostFields: FormField[] = [
  {
    name: "type",
    label: "Type",
    placeholder: "Select post type",
    type: "select",
    options: [
      { label: "Announcement", value: "announcement" },
      { label: "Event", value: "event" },
    ],
  },
  { name: "title", label: "Title", type: "text", placeholder: "Enter post title", required: true },
  { name: "tagline", label: "Tagline", type: "text", placeholder: "Enter a brief tagline" },
  { name: "content", label: "Content", type: "textarea", placeholder: "Write your message here...", required: true },
];
