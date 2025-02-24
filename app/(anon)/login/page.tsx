"use client";

import LoginForm from "./_components/LoginForm/LoginForm";
import JoinLink from "./_components/JoinLink/JoinLink";
import styles from "./page.module.scss";
import Logo from "./_components/Logo/Logo";

export default function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <Logo />

      <LoginForm />
      <JoinLink />
    </div>
  );
}
