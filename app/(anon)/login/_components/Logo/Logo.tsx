"use client";
import styles from "./Logo.module.scss";
import Image from "next/image";

const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <Image
        src="/img/header-logo.png"
        alt="dear day 로고"
        width={300}
        height={200}
        className={styles.logo}
      />
    </div>
  );
};

export default Logo;
