"use client";

import AnimatedCard from "@/components/ui/common/AnimatedCard";
import PageHeader from "@/components/ui/common/PageHeader";
import SelectField from "@/components/ui/common/SelectField";
import EmptyFeeState from "@/components/ui/fee/EmptyFeeState";
import FeeDetails from "@/components/ui/fee/FeeDetails";
import FeeStats from "@/components/ui/fee/FeeStats";
import { useMemo, useState } from "react";
import { motion, Variants } from "framer-motion";
import { MAIN_COLOR } from "@/constants/colors";

export default function FeePaymentsPage({
  classes,
  fees,
  stats,
}: {
  classes: any[];
  fees: any[];
  stats: any;
}) {
  const [selectedClass, setSelectedClass] = useState("");

  const filteredFees = useMemo(() => {
    if (!selectedClass) return [];
    return fees.filter((fee) => fee.student.class?.id === selectedClass);
  }, [fees, selectedClass]);

  const classStats = useMemo(() => {
    if (!selectedClass) return null;

    const totalStudents = filteredFees.length;
    let paid = 0;
    let pending = 0;
    let totalCollected = 0;
    let totalDue = 0;

    filteredFees.forEach((fee) => {
      totalCollected += fee.amountPaid;
      totalDue += fee.remainingFee;

      if (fee.remainingFee <= 0) {
        paid += 1;
      } else {
        pending += 1;
      }
    });

    return {
      totalStudents,
      paid,
      pending,
      totalCollected,
      totalDue,
    };
  }, [filteredFees, selectedClass]);

  const slideFromLeft: Variants = {
    hidden: {
      opacity: 0,
      x: -40,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.45,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <div className="space-y-6">
      <motion.div initial="hidden" animate="visible" variants={slideFromLeft}>
        <PageHeader
          title="Fee Payments"
          subtitle="Track and manage student fee payments"
        />
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={slideFromLeft}>
        <AnimatedCard>
          <div
            className="
                    p-4
                    flex flex-col gap-4
                    sm:flex-row sm:items-end sm:justify-between
                  ">
            <SelectField
              label="Select Class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              options={classes.map((c) => ({
                name: `${c.name} - ${c.section}`,
                id: c.id,
              }))}
            />

            <button
              style={{ backgroundColor: `${MAIN_COLOR}` }}
              className="
                  text-white
                  h-[44px]
                  px-6
                  rounded-lg
                  text-sm font-medium
                  whitespace-nowrap
                  hover:opacity-90
                  transition
                  w-full sm:w-auto"
            >
              Download PDF
            </button>
          </div>
        </AnimatedCard>
      </motion.div>

      {selectedClass && classStats && <FeeStats stats={classStats} />}

      {selectedClass ? (
        <motion.div initial="hidden" animate="visible" variants={slideFromLeft}>
          <AnimatedCard>
            <div className="p-4">
              <h3 className="font-semibold mb-3">
                Fee Details -{" "}
                {classes.find((c) => c.id === selectedClass)?.name} -{" "}
                {classes.find((c) => c.id === selectedClass)?.section}
              </h3>

              <FeeDetails fees={filteredFees} loading={false} />
            </div>
          </AnimatedCard>
        </motion.div>
      ) : (
        <EmptyFeeState />
      )}
    </div>
  );
}
