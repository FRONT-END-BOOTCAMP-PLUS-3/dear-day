"use client";

import BackHeader from "@/components/Header/BackHeader/BackHeader";
import styles from "./page.module.scss";
import Icon from "@/components/Icon/Icon";
import useToggle from "@/hooks/useToggle";
import Modal from "@/components/modal/Modal";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import DropNotice from "../_components/DropNotice/DropNotice";

const Page = () => {
  const [isLogoutModalOpen, toggleLogoutModal] = useToggle(false);
  const [isDropModalOpen, toggleDropModal] = useToggle(false);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogoutConfirm = async () => {
    await logout();
    router.push("/");
  };
  const handleDropConfirm = async () => {
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
      <div className={styles.item} onClick={toggleLogoutModal}>
        <p>로그아웃</p>
        <Icon id="arrow-right" />
      </div>
      <div className={styles.item} onClick={toggleDropModal}>
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
        onConfirm={handleLogoutConfirm}
        onCancel={toggleLogoutModal}
        isOpen={isLogoutModalOpen}
        confirmText="완료"
        cancelText="취소"
      />
      <DropNotice
        onConfirm={handleDropConfirm} // ✅ 탈퇴 후 처리
        onCancel={toggleDropModal} // ✅ 모달 닫기
        isOpen={isDropModalOpen} // ✅ 모달 상태 관리
      />
    </div>
  );
};

export default Page;
