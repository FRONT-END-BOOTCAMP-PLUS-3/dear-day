"use client";

import styles from "./HeartButton.module.scss";
import React, { useState } from "react";
import Icon from "@/components/Icon/Icon";
import { useRouter } from "next/navigation";

const HeartButton = () => {
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  const toggleLike = () => {
    if (!window.location.pathname.includes("/member")) {
      router.push("/login");
    }

    setLiked((prev) => !prev);
  };

  return (
    <button className={styles.heartButton} onClick={toggleLike}>
      {liked ? <Icon id="filled-heart" /> : <Icon id="heart" />}
    </button>
  );
};

export default HeartButton;
