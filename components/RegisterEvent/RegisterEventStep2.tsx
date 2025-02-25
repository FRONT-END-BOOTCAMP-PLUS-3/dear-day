import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import styles from "./RegisterEvent.module.scss";
import { useRegisterEventStore } from "@/store/registerEventStore";
import DateSelectButton from "../ComboBox/DateComboBox/DateComboBox";
import TimeSelectButton from "../ComboBox/TimeComboBox/TimeComboBox";
import Input from "../Input/Input/Input";
import RadioButtonGroup from "../Button/RadioButton/RadioButtonGroup";

// Step2에서 사용할 폼 데이터 타입 정의
interface RegisterEventStep2Form {
  mode: string;
  openAt: string;
  breaktime: string;
  limit: string;
}

const RegisterEventStep2 = ({
  onNext,
}: {
  onNext: (data: RegisterEventStep2Form) => void;
}) => {
  const { control, handleSubmit } = useForm<RegisterEventStep2Form>();
  const { eventData } = useRegisterEventStore();

  // "예약/대기" 라디오 버튼 상태 관리
  const [selectedMode, setSelectedMode] = useState<string>("option1"); // 기본값: 대기

  const onSubmit = (data: RegisterEventStep2Form) => {
    onNext(data); // `page.tsx`에서 handleNext 호출됨
  };

  const handleRadioChange = (value: string) => {
    console.log("선택된 값:", value);
    setSelectedMode(value); // 선택된 라디오 버튼 값 업데이트
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <div className={styles.containerItem}>
        <p>예약/대기</p>
        <RadioButtonGroup
          name="mode"
          options={[
            { label: "예약", value: "option1" },
            { label: "대기", value: "option2" },
          ]}
          defaultValue="option1"
          onChange={handleRadioChange}
        />
      </div>

      {/* selectedMode가 "option2"일 경우 아래 요소들을 숨김 */}
      {selectedMode === "option2" ? (
        <div className={styles.waitingNotice}>
          대기는 카페 운영시간 동안 활성화됩니다.
        </div>
      ) : (
        <>
          <div className={styles.containerItem}>
            <p>예약 오픈 시간</p>
            <DateSelectButton />
            <TimeSelectButton />
          </div>
          <div className={styles.containerItem}>
            <p>쉬는 시간</p>
            <RadioButtonGroup
              name="breaktime"
              options={[
                { label: "10분", value: "option1" },
                { label: "15분", value: "option2" },
                { label: "20분", value: "option3" },
                { label: "없음", value: "option4" },
              ]}
              defaultValue="option1"
              onChange={handleRadioChange}
            />
          </div>
          <div className={styles.containerItem}>
            <p>타임 당 인원</p>
            <Controller
              name="limit"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input value={field.value} onChange={field.onChange} name="" />
              )}
            />
          </div>
        </>
      )}
    </form>
  );
};

export default RegisterEventStep2;
