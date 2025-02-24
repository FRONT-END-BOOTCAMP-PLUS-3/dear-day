"use client";

import LoginForm from "./_components/LoginForm/LoginForm";
import JoinLink from "./_components/JoinLink/JoinLink";
import styles from "./page.module.scss";

export default function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <LoginForm />
      <JoinLink />
    </div>
  );
}
