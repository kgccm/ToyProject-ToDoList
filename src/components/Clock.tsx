"use client";

import React, { useState, useEffect } from "react";
import styles from "./../styles/Clock.module.css"; // 시계 스타일을 위한 CSS 모듈 import

export default function Clock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    // 시간 업데이트 함수
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    // 첫 업데이트 및 1초마다 업데이트
    updateClock();
    const intervalId = setInterval(updateClock, 1000);

    // 컴포넌트가 언마운트될 때 인터벌 정리
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.clockContainer}>
      <div className={styles.clock}>{time}</div>
    </div>
  );
}
