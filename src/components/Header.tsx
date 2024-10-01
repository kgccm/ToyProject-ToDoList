"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import styles from "./../styles/Header.module.css";

export default function Header() {
  //          render: 메인페이지 렌더링          //
  return (
    <div className={styles.HeaderWrapper}>
      <div className={styles.LoginButtonBox}>
        <div className={styles.LoginButtonText}>{"✋Welcome😊"}</div>
      </div>
    </div>
  );
}
