import { api } from "@/services/schooladmin/dashboard/dashboard.api";
import { calculateTodayAttendance } from "@/services/schooladmin/dashboard/dashboard.utils";
import { useEffect, useState, useCallback } from "react";

export function useDashboardData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{
    message: string;
    failedApis: string[];
  } | null>(null);

  /* ---------------- BASE STATE ---------------- */
  const [classes, setClasses] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [attendanceRaw, setAttendanceRaw] = useState<any[]>([]);
  const [teacherLeaves, setTeacherLeaves] = useState<any[]>([]);
  const [teacherPendingLeaves, setTeacherPendingLeaves] = useState<any[]>([]);
  const [feesCollected, setFeesCollected] = useState<number>(0);

  /* ---------------- DERIVED STATE ---------------- */
  const [stats, setStats] = useState<any>({
    totalClasses: 0,
    totalStudents: 0,
    totalTeachers: 0,
    upcomingWorkshops: 0,
    feesCollected: 0,
  });

  const [attendance, setAttendance] = useState<any>({
    student: { percent: 0, present: 0, absent: 0 },
    teacher: { percent: 0, onLeave: 0, present: 0 },
  });

  /* ---------------- DERIVED CALCULATIONS ---------------- */

  const recalculateStats = useCallback(() => {
    setStats({
      totalClasses: classes.length,
      totalStudents: students.length,
      totalTeachers: teachers.length,
      upcomingWorkshops: events.length,
      feesCollected,
    });
  }, [classes, students, teachers, events, feesCollected]);

  const recalculateAttendance = useCallback(() => {
    setAttendance(
      calculateTodayAttendance(
        attendanceRaw,
        teachers,
        teacherLeaves
      )
    );
  }, [attendanceRaw, teachers, teacherLeaves]);

  /* ---------------- INITIAL LOAD ---------------- */

  const loadAll = async () => {
    setLoading(true);
    setError(null);

    try {
      const [
        classesRes,
        studentsRes,
        teachersRes,
        attendanceRes,
        feesRes,
        eventsRes,
        newsRes,
        leavesAll,
        leavesPending,
      ] = await Promise.all([
        api.classes(),
        api.students(),
        api.teachers(),
        api.attendance(),
        api.fees(),
        api.events(),
        api.news(),
        api.leavesAll(),
        api.leavesPending(),
      ]);

      setClasses(classesRes?.classes ?? []);
      setStudents(studentsRes?.students ?? []);
      setTeachers(teachersRes?.teachers ?? []);
      setAttendanceRaw(attendanceRes?.attendances ?? []);
      setEvents(eventsRes?.events ?? []);
      setNews(newsRes?.newsFeeds ?? []);
      setTeacherLeaves(leavesAll ?? []);
      setTeacherPendingLeaves(leavesPending ?? []);
      setFeesCollected(feesRes?.stats?.totalCollected ?? 0);
    } catch {
      setError({
        message: "Failed to load dashboard data",
        failedApis: ["Dashboard"],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  /* ---------------- AUTO RECOMPUTE DERIVED STATE ---------------- */

  useEffect(() => {
    recalculateStats();
  }, [recalculateStats]);

  useEffect(() => {
    recalculateAttendance();
  }, [recalculateAttendance]);

  /* ---------------- TAB-SCOPED RELOADS ---------------- */

  const reloadDashboard = async () => {
    try {
      const [
        classesRes,
        studentsRes,
        teachersRes,
        attendanceRes,
        feesRes,
        eventsRes,
        leavesAll,
      ] = await Promise.all([
        api.classes(),
        api.students(),
        api.teachers(),
        api.attendance(),
        api.fees(),
        api.events(),
        api.leavesAll(),
      ]);

      setClasses(classesRes?.classes ?? []);
      setStudents(studentsRes?.students ?? []);
      setTeachers(teachersRes?.teachers ?? []);
      setAttendanceRaw(attendanceRes?.attendances ?? []);
      setEvents(eventsRes?.events ?? []);
      setTeacherLeaves(leavesAll ?? []);
      setFeesCollected(feesRes?.stats?.totalCollected ?? 0);
    } catch {
      setError({
        message: "Failed to reload dashboard",
        failedApis: ["Dashboard"],
      });
    }
  };

  const reloadClasses = async () => {
    const res = await api.classes();
    setClasses(res?.classes ?? []);
  };

  const reloadStudents = async () => {
    const res = await api.students();
    setStudents(res?.students ?? []);
  };

  const reloadTeachers = async () => {
    const res = await api.teachers();
    setTeachers(res?.teachers ?? []);
  };

  const reloadLeaves = async () => {
    const [pending, all] = await Promise.all([
      api.leavesPending(),
      api.leavesAll(),
    ]);
    setTeacherPendingLeaves(pending ?? []);
    setTeacherLeaves(all ?? []);
  };

  /* ---------------- RETURN ---------------- */

  return {
    loading,
    error,

    // data
    stats,
    attendance,
    classes,
    students,
    teachers,
    events,
    news,
    teacherLeaves,
    teacherPendingLeaves,

    // reloads
    reloadAll: loadAll,
    reloadDashboard,
    reloadClasses,
    reloadStudents,
    reloadTeachers,
    reloadLeaves,
  };
}
