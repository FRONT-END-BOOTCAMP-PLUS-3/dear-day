"use client";

import BackHeader from "@/components/Header/BackHeader/BackHeader";
import styles from "./page.module.scss";
import Icon from "@/components/Icon/Icon";
import useToggle from "@/hooks/useToggle";
import Modal from "@/components/modal/Modal";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

const Page = () => {
  const [isModalOpen, toggleModal] = useToggle(false);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleConfirm = async () => {
    await logout();
    router.push("/");
  };
  return (
    <div className={styles.homeContainer}>
      <BackHeader title={"내 정보"} />
      <div className={styles.item}>
        <p>알림 설정하기</p>
        <Icon id="arrow-right" />
      </div>
      <div className={styles.item} onClick={toggleModal}>
        <p>로그아웃</p>
        <Icon id="arrow-right" />
      </div>
      <div className={styles.item}>
        <p>탈퇴하기</p>
        <Icon id="arrow-right" />
      </div>
      <Modal
        contents={[
          {
            type: "textOnly",
            title: "정말 로그아웃 하시겠습니까?",
          },
        ]}
        onConfirm={handleConfirm}
        onCancel={toggleModal}
        isOpen={isModalOpen}
        confirmText="완료"
        cancelText="취소"
      />
    </div>
  );
};

export default Page;
