"use client";

import Modal from "@/components/modal/Modal";
import { useAuthStore } from "@/store/authStore";
import { useCourseStore } from "@/store/courseStore";
import { useRouter } from "next/navigation";

interface CourseModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  selectedEvents: number[];
}

export default function CourseModal({
  isOpen,
  toggleModal,
  selectedEvents,
}: CourseModalProps) {
  const router = useRouter();
  const { user } = useAuthStore();
  const { name, date, setCourseEvent } = useCourseStore();

  const handleConfirm = async () => {
    if (selectedEvents.length > 0) {
      setCourseEvent(selectedEvents);
    }
    try {
      const response = await fetch("/api/course/create", {
        method: "POST",
        body: JSON.stringify({
          user_id: user?.id,
          name,
          date,
        }),
      });
      const data = await response.json();
      const courseId = data.id;
      router.push(`/member/course/${courseId}`);
    } catch (error) {
      console.error("코스 생성 실패:", error);
      alert("코스 생성에 실패했습니다.");
    }
  };

  return (
    <Modal
      contents={[
        {
          type: "textOnly",
          title: `이대로 [${name}]를 만드시겠어요?`,
        },
      ]}
      onConfirm={handleConfirm}
      onCancel={toggleModal}
      isOpen={isOpen}
      confirmText="확인"
      cancelText="취소"
    />
  );
}
