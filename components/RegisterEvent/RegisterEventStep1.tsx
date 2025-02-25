"use client";
import SearchInput from "../Input/SearchInput/SearchInput";
import styles from "./RegisterEvent.module.scss";
import Input from "../Input/Input/Input";
import NextButton from "../Button/NextButton/NextButton";
import { Controller, useForm } from "react-hook-form";
import DateSelectButton from "../ComboBox/DateComboBox/DateComboBox";
import TimeSelectButton from "../ComboBox/TimeComboBox/TimeComboBox";

// Step1에서 사용할 폼 데이터 타입 정의
interface RegisterEventStep1Form {
  address: string;
  title: string;
  twitterId: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

const RegisterEventStep1 = ({
  onNext,
}: {
  onNext: (data: RegisterEventStep1Form) => void;
}) => {
  const { control, handleSubmit } = useForm<RegisterEventStep1Form>();

  const onSubmit = (data: RegisterEventStep1Form) => {
    console.log("폼데이터", data);
    onNext(data); // `page.tsx`에서 handleNext 호출됨
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <div className={styles.containerItem}>
          <p>장소</p>
          <Controller
            name="address"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <SearchInput value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
        <div className={styles.containerItem}>
          <p>이벤트 기간</p>
          <div className={styles.item}>
            <Controller
              name="startDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <DateSelectButton
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <span>~</span>
            <Controller
              name="endDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <DateSelectButton
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
        <div className={styles.containerItem}>
          <p>카페 운영 시간</p>
          <div className={styles.item}>
            <Controller
              name="startTime"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TimeSelectButton
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <span>~</span>
            <Controller
              name="endTime"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TimeSelectButton
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
        <div className={styles.containerItem}>
          <p>생카 제목</p>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input value={field.value} onChange={field.onChange} name="" />
            )}
          />
        </div>
        <div className={styles.containerItem}>
          <p>주최자 계정</p>
          <Controller
            name="twitterId"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input value={field.value} onChange={field.onChange} name="" />
            )}
          />
        </div>
        <NextButton onClick={handleSubmit(onSubmit)} value="다음" />
      </div>
    </form>
  );
};

export default RegisterEventStep1;
