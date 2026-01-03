import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const classId = searchParams.get("classId");
    const studentId = searchParams.get("studentId");
    const subject = searchParams.get("subject");

    const schoolId = session.user.schoolId;

    if (!schoolId) {
      return NextResponse.json(
        { message: "School not found in session" },
        { status: 400 }
      );
    }

    const where: any = {
      class: {
        schoolId,
      },
    };
    if (session.user.studentId) {
      where.studentId = session.user.studentId;
    } else {

      if (studentId) where.studentId = studentId;
      if (classId) where.classId = classId;
    }

    if (subject) {
      where.subject = subject;
    }

    const marks = await prisma.mark.findMany({
      where,
      include: {
        student: session.user.studentId ? undefined : {
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
          },
        },
        class: {
          select: { id: true, name: true, section: true },
        },
        teacher: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });


    let classTotals: { studentId: string; totalObtained: number }[] = [];

    const resolvedClassId =
      classId ??
      marks.find((m) => m.classId)?.classId ??
      null;

    if (resolvedClassId) {
      const totals = await prisma.mark.groupBy({
        by: ["studentId"],
        where: {
          classId: resolvedClassId,
        },
        _sum: {
          marks: true,
        },
      });

      classTotals = totals.map((t) => ({
        studentId: t.studentId!,
        totalObtained: t._sum.marks || 0,
      }));
    }

    return NextResponse.json(
      {
        marks,
        classTotals,
        currentStudentId: session.user.studentId || null,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("View marks error:", error);
    return NextResponse.json(
      { message: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
