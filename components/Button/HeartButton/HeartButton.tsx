"use client";

import styles from "./HeartButton.module.scss";
import React, { useEffect, useState } from "react";
import Icon from "@/components/Icon/Icon";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

interface HeartButtonProps {
  eventId: number;
}

const HeartButton = ({ eventId }: HeartButtonProps) => {
  const { user } = useAuthStore();
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLikedStatus = async () => {
      if (!user) return;
      try {
        const response = await fetch(
          `/api/like?userId=${user.id}&eventId=${eventId}`
        );
        const data = await response.json();
        setLiked(data.liked);
      } catch (error) {
        console.error("좋아요 상태 확인 실패:", error);
      }
    };
    checkLikedStatus();
  }, [eventId, user]);

  const toggleLike = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    const previousLiked = liked;
    setLiked((prev) => !prev);

    try {
      if (!previousLiked) {
        const response = await fetch("/api/like", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            eventId: eventId,
          }),
        });
        if (!response.ok) {
          throw new Error("좋아요 추가 실패");
        }
      } else {
        const response = await fetch("/api/like", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            eventId: eventId,
          }),
        });
        if (!response.ok) {
          throw new Error("좋아요 삭제 실패");
        }
      }
    } catch (error) {
      console.error("좋아요 요청 에러:", error);
      setLiked(previousLiked);
    }
  };

  return (
    <button className={styles.heartButton} onClick={toggleLike}>
      {liked ? <Icon id="filled-heart" /> : <Icon id="heart" />}
    </button>
  );
};

export default HeartButton;
