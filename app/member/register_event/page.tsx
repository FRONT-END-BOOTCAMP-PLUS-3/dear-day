"use client";

import { useRouter } from "next/navigation";
import { useRegisterEventStore } from "@/store/registerEventStore";
import RegisterEventStep1, {
  RegisterEventStep1Form,
} from "@/components/RegisterEvent/RegisterEventStep1";
import RegisterEventStep2 from "@/components/RegisterEvent/RegisterEventStep2";
import NextButton from "@/components/Button/NextButton/NextButton";
import styles from "./page.module.scss";
import RegisterEventStep3 from "@/components/RegisterEvent/RegisterEventStep3";
import ConfirmCancelButton from "./components/ConfirmCancelButton/ConfirmCancelBytton";

export default function RegisterEventPage() {
  const { step, setStep, eventData, updateEventData, resetEventData } =
    useRegisterEventStore();
  const router = useRouter();

  const handleNext = (data: Partial<RegisterEventStep1Form>) => {
    updateEventData({
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : null, // 문자열 → Date 변환
      endDate: data.endDate ? new Date(data.endDate) : null, // 문자열 → Date 변환
    });

    console.log("업데이트된 데이터:", data);

    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log("최종 데이터:", eventData);
      resetEventData();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1); // 이전 Step으로 이동
    }
  };

  return (
    <div className={styles.homeContainer}>
      {step === 1 && <RegisterEventStep1 onNext={handleNext} />}
      {step === 2 && <RegisterEventStep2 onNext={handleNext} />}
      {step === 3 && <RegisterEventStep3 onNext={handleNext} />}

      {step === 1 && (
        <NextButton
          onClick={() => {
            document
              .getElementById("step1-form")
              ?.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true })
              );
          }}
          value={"다음"}
        />
      )}
      {step !== 1 && (
        <ConfirmCancelButton
          onConfirm={() => {
            document
              .getElementById(`step${step}-form`)
              ?.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true })
              );
          }}
          onCancel={handlePrev}
        />
      )}
    </div>
  );
}
