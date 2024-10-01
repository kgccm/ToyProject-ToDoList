"use client";
import React, { useState } from "react";
import "./../styles/globals.css";
import Calender from "@/components/Calender";
import TodoSection from "@/components/TodoSection";

export default function page() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  //          event handler:           //
  const handleDateSelection = (date: number, month: number, year: number) => {
    setSelectedDate(date);
    setCurrentMonth(month);
    setCurrentYear(year);
  };
  //          render: 메인페이지 렌더링          //
  return (
    <div className="content-container">
      <Calender />
      <TodoSection />
    </div>
  );
}
