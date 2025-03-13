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
import SearchStar from "@/components/SearchStar/SearchStar";
import styles from "./page.module.scss";

export default function RegisterEventPage() {
  const { step, setStep, eventData, updateEventData } = useRegisterEventStore();
  // 모든 단계 폼 타입
  type RegisterEventForm =
    | RegisterEventStep1Form
    | RegisterEventStep2Form
    | RegisterEventStep3Form;

  const handleNext = async (data?: RegisterEventForm) => {
    if (step === 0) {
      setStep(1);
      return;
    }

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

  // 스타 선택 시 store에 저장 후 step 이동
  const handleSelectStar = async (id: number) => {
    await updateEventData({ starId: id });

    setStep(1);
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className={styles.homeContainer}>
      {step === 0 && <SearchStar onSelectStarId={handleSelectStar} />}
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
