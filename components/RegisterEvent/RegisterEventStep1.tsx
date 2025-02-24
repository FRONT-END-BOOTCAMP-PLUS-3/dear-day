"use client";
import SearchInput from "../Input/SearchInput/SearchInput";
import styles from "./RegisterEvent.module.scss";
import Input from "../Input/Input/Input";
import NextButton from "../Button/NextButton/NextButton";
import { Controller, useForm } from "react-hook-form";
import DateSelectButton from "../ComboBox/DateComboBox/DateComboBox";
import TimeSelectButton from "../ComboBox/TimeComboBox/TimeComboBox";
import { useRegisterEventStore } from "@/store/registerEventStore";

// Step1에서 사용할 폼 데이터 타입 정의
interface RegisterEventForm {
  place: string;
  eventName: string;
  ownerAccount: string;
  eventStartDate: string;
  eventEndDate: string;
  openTime: string;
  closeTime: string;
}

const RegisterEventStep1 = () => {
  const { control, register, handleSubmit } = useForm<RegisterEventForm>();
  const { updateEventData, setStep } = useRegisterEventStore();

  const onSubmit = (data: RegisterEventForm) => {
    updateEventData(data); // Zustand에 저장
    console.log(data);
    setStep(2); // Step2로 이동
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <div className={styles.containerItem}>
          <p>장소</p>
          <SearchInput value={""} {...register("place")} />
        </div>
        <div className={styles.containerItem}>
          <p>이벤트 기간</p>
          {/* 🔥 `Controller`로 DateSelectButton 감싸기 */}
          <Controller
            name="eventStartDate"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <DateSelectButton value={field.value} onChange={field.onChange} />
            )}
          />
          <Controller
            name="eventEndDate"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <DateSelectButton value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
        <div className={styles.containerItem}>
          <p>카페 운영 시간</p>
          {/* 🔥 `Controller`로 TimeSelectButton 감싸기 */}
          <Controller
            name="openTime"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TimeSelectButton value={field.value} onChange={field.onChange} />
            )}
          />
          <Controller
            name="closeTime"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TimeSelectButton value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
        <div className={styles.containerItem}>
          <p>생카 제목</p>
          <Input value={""} {...register("eventName")} />
        </div>
        <div className={styles.containerItem}>
          <p>주최자 계정</p>
          <Input value={""} {...register("ownerAccount")} />
        </div>
        {/* 🔥 기존 버튼을 FixedButton으로 변경 */}
        <NextButton onClick={handleSubmit(onSubmit)} value="다음" />
      </div>
    </form>
  );
};

export default RegisterEventStep1;
