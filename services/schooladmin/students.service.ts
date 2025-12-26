import { api } from "../api";

export const getStudents = (classId?: string) =>
  api(`/api/students${classId ? `?classId=${classId}` : ""}`);

export const addStudent = (payload: any) =>
  api("/api/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const uploadStudentsCSV = (file: File, classId: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("classId", classId);

  return fetch("/api/students/upload", {
    method: "POST",
    body: formData,
  }).then(res => res.json());
};
