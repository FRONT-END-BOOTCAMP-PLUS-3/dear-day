"use client";

import { useRegisterEventStore } from "@/store/registerEventStore";
import RegisterEventStep1, {
  RegisterEventStep1Form,
} from "@/components/RegisterEvent/RegisterEventStep1";
import RegisterEventStep2, {
  RegisterEventStep2Form,
} from "@/components/RegisterEvent/RegisterEventStep2";
import RegisterEventStep3, {
  RegisterEventStep3Form,
} from "@/components/RegisterEvent/RegisterEventStep3";
import styles from "./page.module.scss";
import { useEffect } from "react";
import { useParams } from "next/navigation";

export default function EditEventPage() {
  const { event_id } = useParams();
  const {
    step,
    setStep,
    loadEventData,
    resetEventData,
    updateEventData,
    setEditingMode,
  } = useRegisterEventStore();
  // 모든 단계 폼 타입
  type RegisterEventForm =
    | RegisterEventStep1Form
    | RegisterEventStep2Form
    | RegisterEventStep3Form;

  const fetchEventData = async () => {
    try {
      const response = await fetch(
        `/api/manage/update-my-event?eventId=${event_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("이벤트 정보를 불러오는 데 실패했습니다.");
      }

      const data = await response.json();
      loadEventData(data.event.eventDetail); // store에 데이터 저장
    } catch (error) {
      console.error("이벤트 정보 불러오기 실패: ", error);
    }
  };

  const { eventData } = useRegisterEventStore();

  // 이벤트 데이터가 있으면 수정모드
  useEffect(() => {
    if (!event_id) {
      setEditingMode(false);
      resetEventData();
      return;
    }

    setEditingMode(true);
    setStep(1);
    fetchEventData();
  }, [event_id, setEditingMode, resetEventData, setStep]);

  const handleNext = async (data?: Partial<RegisterEventForm>) => {
    if (data) {
      await updateEventData({
        ...data,
        startDate:
          "startDate" in data && data.startDate
            ? new Date(data.startDate)
            : eventData.startDate,
        endDate:
          "endDate" in data && data.endDate
            ? new Date(data.endDate)
            : eventData.endDate,
      });
    }

    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className={styles.homeContainer}>
      {step === 1 && <RegisterEventStep1 onNext={handleNext} />}
      {step === 2 && (
        <RegisterEventStep2 onNext={handleNext} onPrev={handlePrev} />
      )}
      {step === 3 && (
        <RegisterEventStep3 onNext={handleNext} onPrev={handlePrev} />
      )}
    </div>
  );
}
