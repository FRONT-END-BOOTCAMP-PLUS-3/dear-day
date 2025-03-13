"use client";

import styles from "./StarButton.module.scss";
import React, { useEffect, useState } from "react";
import Icon from "@/components/Icon/Icon";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

interface StarButtonProps {
  starId: number;
}

const StarButton = ({ starId }: StarButtonProps) => {
  const { user } = useAuthStore();
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLikedStatus = async () => {
      try {
        const response = await fetch(`/api/like/star?starId=${starId}`, {
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
        if (process.env.NODE_ENV === "development") {
          console.error("🚨 좋아요 상태 요청 실패:", error);
        }
      }
    };
    checkLikedStatus();
  }, [starId, user]);

  const toggleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const previousLiked = liked;
    setLiked(!previousLiked);

    try {
      if (!previousLiked) {
        const response = await fetch(`/api/like/star`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ starId }),
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
        const response = await fetch(`/api/like/star`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ starId }),
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
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 좋아요 요청 실패:", error);
      }
      setLiked(previousLiked);
    }
  };

  return (
    <button className={styles.starButton} onClick={toggleLike}>
      {liked ? <Icon id="filled-star" /> : <Icon id="star" />}
    </button>
  );
};

export default StarButton;
