"use client";

import { useEffect, useState, useCallback } from "react";
import { useStudentContext } from "@/context/StudentContext";
import { parentApi } from "@/services/parent/parent.api";
import { safeArray } from "../useSchoolAdminDashboard";

export function useParentDashboardData() {
  const { activeStudent } = useStudentContext();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{
    message: string;
    failedApis: string[];
  } | null>(null);

  /* ---------------- BASE STATE ---------------- */
  const [homeworks, setHomeworks] = useState<any[]>([]);
  const [attendanceRaw, setAttendanceRaw] = useState<any[]>([]);
  const [marks, setMarks] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [fees, setFees] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);

  /* ---------------- DERIVED STATE ---------------- */
  const [attendanceStats, setAttendanceStats] = useState({
    present: 0,
    absent: 0,
    late: 0,
    percent: 0,
  });

  /* ---------------- DERIVED CALCULATIONS ---------------- */

const recalculateAttendance = useCallback(() => {
  const normalized = attendanceRaw.map(a => ({
    ...a,
    status: String(a.status).toUpperCase().trim(),
  }));

  const present = normalized.filter(a => a.status === "PRESENT").length;
  const absent = normalized.filter(a => a.status === "ABSENT").length;
  const late = normalized.filter(a => a.status === "LATE").length;

  const total = normalized.length;

  setAttendanceStats({
    present,
    absent,
    late,
    percent: total ? Math.round(((present + late) / total) * 100) : 0,
  });
}, [attendanceRaw]);


  /* ---------------- LOAD ALL (CORE) ---------------- */

  const loadAll = useCallback(async () => {
    if (!activeStudent?.id) {
    return; 
  }
    setLoading(true);
    setError(null);

    try {
      // FUTURE READY:
      // today -> backend ignores studentId
      // tomorrow -> backend filters by studentId
      const studentId = activeStudent?.id;

      const [
        homeworkRes,
        attendanceRes,
        marksRes,
        eventsRes,
        certificatesRes,
        feesRes,
        appointmentsRes,
      ] = await Promise.all([
        parentApi.homeworks(studentId),
        parentApi.attendance(studentId),
        parentApi.marks(studentId),
        parentApi.events(studentId),
        parentApi.certificates(studentId),
        parentApi.fees(studentId),
        parentApi.appointments(),
      ]);

      setHomeworks(safeArray(homeworkRes?.homeworks));
      setAttendanceRaw(safeArray(attendanceRes?.attendances));
      setMarks(safeArray(marksRes?.marks));
      setEvents(safeArray(eventsRes?.events));
      setCertificates(safeArray(certificatesRes?.certificates));
      setFees(feesRes?.fee ?? null);
      setAppointments(safeArray(appointmentsRes?.appointments));

    } catch {
      setError({
        message: "Failed to load parent dashboard data",
        failedApis: ["ParentDashboard"],
      });
    } finally {
      setLoading(false);
    }
  }, [activeStudent?.id]);

  /* ---------------- AUTO LOAD ON STUDENT CHANGE ---------------- */

useEffect(() => {
  if (activeStudent?.id) {
    loadAll();
  }
}, [activeStudent?.id, loadAll]);


  /* ---------------- AUTO DERIVED ---------------- */

useEffect(() => {
  recalculateAttendance();
}, [attendanceRaw, recalculateAttendance]);


  /* ---------------- TAB-LEVEL RELOADS ---------------- */

  const reloadHomework = async () => {
    const res = await parentApi.homeworks(activeStudent?.id);
    setHomeworks(safeArray(res?.homeworks));
  };

  const reloadAttendance = async () => {
    const res = await parentApi.attendance(activeStudent?.id);
    setAttendanceRaw(safeArray(res?.attendances));
  };

  const reloadMarks = async () => {
    const res = await parentApi.marks(activeStudent?.id);
    setMarks(safeArray(res?.marks));
  };

  /* ---------------- RETURN ---------------- */

  return {
    loading,
    error,

    // raw data
    homeworks,
    attendanceRaw,
    marks,
    events,
    certificates,
    fees,
    appointments,

    // derived
    attendanceStats,

    // reloads
    reloadAll: loadAll,
    reloadHomework,
    reloadAttendance,
    reloadMarks,
  };
}
