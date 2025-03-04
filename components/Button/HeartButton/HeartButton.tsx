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
      try {
        const response = await fetch(`/api/like?eventId=${eventId}`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("좋아요 상태를 불러오는데 실패했습니다.");
        }
        const data = await response.json();
        setLiked(!!data.createdAt);
      } catch (error) {
        console.error("좋아요 상태 확인 실패:", error);
      }
    };
    checkLikedStatus();
  }, [eventId, user]);

  const toggleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      router.push("/login");
      return;
    }

    const previousLiked = liked;
    setLiked(!previousLiked);

    try {
      if (!previousLiked) {
        const response = await fetch(`/api/like`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId }),
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("좋아요 추가 실패");
        }
      } else {
        const response = await fetch(`/api/like`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId }),
          credentials: "include",
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
