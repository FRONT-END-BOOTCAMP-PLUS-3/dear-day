"use client";

import { useRouter } from "next/navigation";
import { useRegisterEventStore } from "@/store/registerEventStore";
import RegisterEventStep1 from "@/components/RegisterEvent/RegisterEventStep1";
import RegisterEventStep2 from "@/components/RegisterEvent/RegisterEventStep2";
import NextButton from "@/components/Button/NextButton/NextButton";
import styles from "./page.module.scss";
import RegisterEventStep3 from "@/components/RegisterEvent/RegisterEventStep3";
import ConfirmCancelButton from "@/components/Button/ConfirmCancelButton/ConfirmCancelBytton";

export default function RegisterEventPage() {
  const { step, setStep, eventData, updateEventData, resetEventData } =
    useRegisterEventStore();
  const router = useRouter();

  const handleNext = (data: Partial<typeof eventData>) => {
    updateEventData(data); // Zustand에 저장
    console.log(eventData);

    if (step < 3) {
      setStep(step + 1); // 다음 Step으로 이동
    } else {
      // Step3에서는 최종 제출
      console.log("최종 데이터:", eventData);
      resetEventData(); // 상태 초기화
      router.push("/success-page"); // 다른 페이지로 이동
    }
  };

  return (
    <div className={styles.homeContainer}>
      {step === 1 && <RegisterEventStep1 onNext={handleNext} />}
      {step === 2 && <RegisterEventStep2 onNext={handleNext} />}
      {step === 3 && <RegisterEventStep3 onNext={handleNext} />}

      {step === 1 && (
        <>
          <NextButton onClick={() => handleNext({})} value={"다음"} />
        </>
      )}
      {step !== 1 && (
        <ConfirmCancelButton
          onConfirm={() => handleNext({})}
          onCancel={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
    </div>
  );
}
