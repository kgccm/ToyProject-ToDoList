"use client";
import React, { useEffect, useState } from "react";
import styles from "./../styles/Calender.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/stores";
import { setSelectedDate } from "@/stores/dateReducer";

export default function Calendar() {
  const dispatch = useDispatch();
  const selectedDate = useSelector(
    (state: RootState) => state.date.selectedDate
  );
  const [days, setDays] = useState<number[]>([]);

  // 날짜 클릭 이벤트 핸들러
  const onDateClickHandler = (day: number) => {
    const newSelectedDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      day,
      12,
      0,
      0,
      0
    );
    dispatch(setSelectedDate(newSelectedDate));
  };

  useEffect(() => {
    generateCalendar();
  }, [selectedDate]);

  //달력 데이터를 생성
  const generateCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const firstDayIndex = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const daysArray = Array(firstDayIndex)
      .fill(null)
      .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

    setDays(daysArray);
  };

  // 현재 월 이름과 연도 표시
  const getMonthName = (date: Date) => {
    return date.toLocaleString("default", { month: "long" });
  };

  // 월 변경 핸들러
  const changeMonth = (direction: number) => {
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + direction,
      1,
      12, // 시간 설정으로 시간대 문제 방지
      0,
      0,
      0
    );
    dispatch(setSelectedDate(newDate));
  };

  // 연도 변경 핸들러
  const changeYear = (direction: number) => {
    const newDate = new Date(
      selectedDate.getFullYear() + direction,
      selectedDate.getMonth(),
      1,
      12, // 시간 설정으로 시간대 문제 방지
      0,
      0,
      0
    );
    dispatch(setSelectedDate(newDate));
  };

  // 오늘 날짜 확인 함수
  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    );
  };

  // 선택된 날짜 확인 함수
  const isSelectedDate = (day: number) => {
    return (
      day === selectedDate.getDate() &&
      selectedDate.getMonth() === selectedDate.getMonth() &&
      selectedDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <div className={styles.calendarContainer}>
      {/* 캘린더 헤더 */}
      <div className={styles.calendarHeader}>
        <button onClick={() => changeYear(-1)}>{"<<"}</button>
        <button onClick={() => changeMonth(-1)}>{"<"}</button>
        <h2>{`${getMonthName(selectedDate)} ${selectedDate.getFullYear()}`}</h2>
        <button onClick={() => changeMonth(1)}>{">"}</button>
        <button onClick={() => changeYear(1)}>{">>"}</button>
        <button onClick={() => setSelectedDate(new Date())}>today</button>
      </div>

      {/* 요일 */}
      <div className={styles.weekdays}>
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 */}
      <div className={styles.days}>
        {days.map((day, index) => (
          <div
            key={index}
            className={`${styles.day} ${
              day !== null && isToday(day) ? styles.today : ""
            } ${day !== null && isSelectedDate(day) ? styles.selected : ""}`}
            onClick={() => day !== null && onDateClickHandler(day)}
          >
            {day !== null ? day : ""}
          </div>
        ))}
      </div>
    </div>
  );
}
