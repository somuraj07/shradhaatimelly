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
      withStudent("/api/homework/list", studentId)
    ),

  attendance: (studentId?: string) =>
    apiJson<{ attendances: any[] }>(
      withStudent("/api/attendance/view", studentId)
    ),

  marks: (studentId?: string) =>
    apiJson<{ marks: any[] }>(
      withStudent("/api/marks/view", studentId)
    ),

  events: (studentId?: string) =>
    apiJson<{ events: any[] }>(
      withStudent("/api/events/list", studentId)
    ),

  certificates: (studentId?: string) =>
    apiJson<{ certificates: any[] }>(
      withStudent("/api/certificates/list", studentId)
    ),

  fees: (studentId?: string) =>
    apiJson<{ fee: any }>(
      studentId ? `/api/fees/${studentId}` : "/api/fees/mine"
    ),

  appointments: () =>
    apiJson<{ appointments: any[] }>("/api/communication/appointments"),
};
