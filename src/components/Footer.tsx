"use client";
import React from 'react'
import styles from "./../styles/Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.FooterContainer}>
      <div className={styles.FooterDeveloperInfo}>{'Developed By Kgccm'}</div>
      <div className={styles.IconBox}>
        <div className={styles.IconGithub}></div>
        <div className={styles.IconInstagram}></div>
      </div>
    </div>
  )
}
