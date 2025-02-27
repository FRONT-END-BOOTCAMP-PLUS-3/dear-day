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
import { useRouter } from "next/navigation";

export default function RegisterEventPage() {
  const { step, setStep, eventData, updateEventData, resetEventData } =
    useRegisterEventStore();
  const router = useRouter();

  // 📌 `handleNext`가 step1, step2, step3의 모든 타입을 받을 수 있도록 변경
  type RegisterEventForm =
    | Partial<RegisterEventStep1Form>
    | RegisterEventStep2Form
    | RegisterEventStep3Form;

  const handleNext = async (data: RegisterEventForm) => {
    updateEventData({
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

    // if (step < 3) {
    //   setStep(step + 1);
    // } else {
    //   // 📌 마지막 단계: 모든 데이터를 DB에 저장
    //   try {
    //     const response = await fetch("/api/register-event", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(eventData), // 🔥 store에 저장된 모든 데이터 전송
    //     });

    //     if (!response.ok) {
    //       throw new Error("이벤트 등록 실패");
    //     }

    //     console.log("이벤트 등록 성공!");
    //     resetEventData(); // ✅ 데이터 초기화
    //     router.push("/events"); // ✅ 성공 후 이동
    //   } catch (error) {
    //     console.error("등록 중 오류 발생:", error);
    //   }
    // }
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
