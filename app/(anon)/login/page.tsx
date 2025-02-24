"use client";

import LoginForm from "./_components/LoginForm/LoginForm";
import JoinLink from "./_components/JoinLink/JoinLink";
import s from "../../page.module.scss";

export default function LoginPage() {
  return (
    <div className={s.page}>
      <LoginForm />
      <JoinLink />
    </div>
  );
}
