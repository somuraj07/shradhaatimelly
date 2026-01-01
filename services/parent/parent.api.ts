import { apiJson } from "../api";

// helper – future-proof
const withStudent = (url: string, studentId?: string) => {
  // TODAY: backend ignores studentId
  // FUTURE: backend filters by studentId
  return studentId ? `${url}?studentId=${studentId}` : url;
};

export const parentApi = {
  homeworks: (studentId?: string) =>
    apiJson<{ homeworks: any[] }>(
      withStudent("/api/homeworks", studentId)
    ),

  attendance: (studentId?: string) =>
    apiJson<{ attendances: any[] }>(
      withStudent("/api/attendance", studentId)
    ),

  marks: (studentId?: string) =>
    apiJson<{ marks: any[] }>(
      withStudent("/api/marks", studentId)
    ),

  events: (studentId?: string) =>
    apiJson<{ events: any[] }>(
      withStudent("/api/events", studentId)
    ),

  certificates: (studentId?: string) =>
    apiJson<{ certificates: any[] }>(
      withStudent("/api/certificates", studentId)
    ),

  fees: (studentId?: string) =>
    apiJson<{ fee: any }>(
      studentId ? `/api/fees/${studentId}` : "/api/fees"
    ),

  appointments: () =>
    apiJson<{ appointments: any[] }>("/api/appointments"),
};
