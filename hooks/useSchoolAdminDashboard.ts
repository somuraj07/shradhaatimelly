"use client";

import { useEffect, useState } from "react";

type DashboardError =
  | null
  | {
      message: string;
      failedApis: string[];
    };

export function useDashboardData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<DashboardError>(null);

  const [stats, setStats] = useState({
    totalClasses: 0,
    totalStudents: 0,
    totalTeachers: 0,
    upcomingWorkshops: 0,
    feesCollected: 0,
  });

  const [attendance, setAttendance] = useState({
    student: { percent: 0, present: 0, absent: 0 },
    teacher: { percent: 0, onLeave: 0, present: 0 },
  });

  const [workshops, setWorkshops] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const safeFetch = async (url: string, name: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${name} failed`);
      return await res.json();
    } catch {
      return { __error: name };
    }
  };

  const loadDashboard = async () => {
    setLoading(true);
    setError(null);

    const failedApis: string[] = [];

    const [
      classes,
      students,
      fees,
      events,
      newsData,
      attendanceData,
    ] = await Promise.all([
      safeFetch("/api/class/list", "Classes"),
      safeFetch("/api/student/list", "Students"),
      safeFetch("/api/fees/summary", "Fees"),
      safeFetch("/api/events/list", "Events"),
      safeFetch("/api/newsfeed/list", "News"),
      safeFetch("/api/attendance/view", "Attendance"),
    ]);

    // Track failures
    [
      classes,
      students,
      fees,
      events,
      newsData,
      attendanceData,
    ].forEach((res) => {
      if (res?.__error) failedApis.push(res.__error);
    });

    /* -------------------- Stats -------------------- */
    setStats({
      totalClasses: classes?.classes?.length ?? 0,
      totalStudents: students?.students?.length ?? 0,
      totalTeachers: classes?.classes
        ? new Set(
            classes.classes.map((c: any) => c.teacherId).filter(Boolean)
          ).size
        : 0,
      upcomingWorkshops: events?.events?.length ?? 0,
      feesCollected: fees?.stats?.totalCollected ?? 0,
    });

    /* -------------------- Attendance -------------------- */
    if (attendanceData?.attendances) {
      const total = attendanceData.attendances.length;
      const present = attendanceData.attendances.filter(
        (a: any) => a.status === "PRESENT"
      ).length;
      const absent = attendanceData.attendances.filter(
        (a: any) => a.status === "ABSENT"
      ).length;

      setAttendance({
        student: {
          percent: total ? Math.round((present / total) * 100) : 0,
          present,
          absent,
        },
        teacher: {
          percent: 0,
          onLeave: 0,
          present: 0,
        },
      });
    }

    /* -------------------- Lists -------------------- */
    setWorkshops(events?.events?.slice(0, 3) ?? []);
    setNews(newsData?.newsFeeds?.slice(0, 3) ?? []);

    /* -------------------- Error UI -------------------- */
    if (failedApis.length) {
      setError({
        message: "Some dashboard data failed to load",
        failedApis,
      });
    }

    setLoading(false);
  };

  return {
    loading,
    error,
    stats,
    attendance,
    workshops,
    news,
    reload: loadDashboard,
  };
}
