import { api } from "../api";

export const getTeachers = () => api("/api/teacher/list");