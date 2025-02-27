"use client";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import styles from "./RegisterEvent.module.scss";
import { useRegisterEventStore } from "@/store/registerEventStore";
import TimeSelectButton from "../ComboBox/TimeComboBox/TimeComboBox";
import Input from "../Input/Input/Input";
import RadioButtonGroup from "../Button/RadioButton/RadioButtonGroup";

export interface RegisterEventStep2Form {
  mode: string;
  openAt: string;
  breakTime: number;
  limit: number;
}

const RegisterEventStep2 = ({
  onNext,
}: {
  onNext: (data: RegisterEventStep2Form) => void;
}) => {
  const { eventData, updateEventData } = useRegisterEventStore();
  const { control, handleSubmit, reset, watch } =
    useForm<RegisterEventStep2Form>({
      defaultValues: {
        mode: eventData.mode || "RESERVATION",
        openAt: eventData.openAt || "",
        breakTime: eventData.breakTime ?? 10,
        limit: eventData.limit || 0,
      },
    });

  // `watch`를 사용해서 mode 값 추적
  const modeValue = watch("mode");

  useEffect(() => {
    reset({
      mode: eventData.mode || "RESERVATION",
      openAt: eventData.openAt || "",
      breakTime: eventData.breakTime || 0,
      limit: eventData.limit || 0,
    });
  }, [eventData, reset]);

  const onSubmit = (data: RegisterEventStep2Form) => {
    console.log("Step2 제출 데이터:", data);

    updateEventData({
      mode: data.mode,
      openAt: data.mode === "WAITING" ? "" : data.openAt,
      breakTime: data.mode === "WAITING" ? 0 : data.breakTime,
      limit: data.mode === "WAITING" ? 0 : data.limit,
    });

    onNext(data);
  };

  return (
    <form
      id="step2-form"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.container}
    >
      <div className={styles.containerItem}>
        <p>예약/대기</p>
        <Controller
          name="mode"
          control={control}
          render={({ field }) => (
            <RadioButtonGroup
              name={field.name}
              options={[
                { label: "예약", value: "RESERVATION" },
                { label: "대기", value: "WAITING" },
              ]}
              defaultValue="RESERVATION"
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                reset({
                  ...watch(), // 현재 입력된 값 유지
                  mode: value, // ✅ mode 값 업데이트
                  openAt: value === "WAITING" ? "" : watch("openAt"),
                  breakTime: value === "WAITING" ? 0 : watch("breakTime"),
                  limit: value === "WAITING" ? 0 : watch("limit"),
                });
              }}
            />
          )}
        />
      </div>

      {/* mode가 "WAITING"일 경우 아래 요소들을 숨김 */}
      {modeValue === "WAITING" ? (
        <div className={styles.waitingNotice}>
          대기는 카페 운영시간 동안 활성화됩니다.
        </div>
      ) : (
        <>
          <div className={styles.containerItem}>
            <p>예약 오픈 시간</p>
            <Controller
              name="openAt"
              control={control}
              render={({ field }) => (
                <TimeSelectButton
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => field.onChange(date.toISOString())}
                />
              )}
            />
          </div>
          <Controller
            name="breakTime"
            control={control}
            render={({ field }) => (
              <RadioButtonGroup
                name={field.name}
                options={[
                  { label: "10분", value: 10 },
                  { label: "15분", value: 15 },
                  { label: "20분", value: 20 },
                  { label: "없음", value: 0 },
                ]}
                defaultValue={10}
                value={field.value}
                onChange={(value) => {
                  field.onChange(Number(value));
                }}
              />
            )}
          />

          <div className={styles.containerItem}>
            <p>타임 당 인원</p>
            <Controller
              name="limit"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  value={field.value}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^0-9]/g, "");
                    field.onChange(
                      numericValue === "" ? "" : Number(numericValue)
                    );
                  }}
                  placeholder="00"
                  name=""
                />
              )}
            />
          </div>
        </>
      )}
    </form>
  );
};

export default RegisterEventStep2;
