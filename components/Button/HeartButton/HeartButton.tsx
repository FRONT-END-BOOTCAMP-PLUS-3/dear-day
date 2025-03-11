"use client";

import styles from "./HeartButton.module.scss";
import React, { useEffect, useState } from "react";
import Icon from "@/components/Icon/Icon";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

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
        if (response.status === 400) {
          return false;
        }
        if (!response.ok) {
          throw new Error("좋아요 상태를 불러오는데 실패했습니다.");
        }
        const data = await response.json();
        setLiked(!!data);
      } catch (error) {
        console.error("좋아요 상태 확인 실패:", error);
      }
    };
    checkLikedStatus();
  }, [eventId, user]);

  const toggleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

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
        // 만약 서버에서 로그인되지 않은 경우 401을 반환하도록 했다면:
        if (response.status === 401) {
          return router.push(`/login`);
        }
        // 또는 리디렉션 상태 처리 (307)도 고려
        if (response.status === 307) {
          return router.push(`/login`);
        }
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
        if (response.status === 401 || response.status === 307) {
          return router.push(`/login`);
        }
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
