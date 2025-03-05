"use client";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import styles from "./RegisterEvent.module.scss";
import { useRegisterEventStore } from "@/store/registerEventStore";
import TimeSelectButton from "../ComboBox/TimeComboBox/TimeComboBox";
import Input from "../Input/Input/Input";
import RadioButtonGroup from "../Button/RadioButton/RadioButtonGroup";
import ConfirmCancelButton from "@/app/member/register_event/components/ConfirmCancelButton/ConfirmCancelBytton";

export interface RegisterEventStep2Form {
  mode: string;
  openAt: Date;
  breaktime: number;
  limit: number;
}

const RegisterEventStep2 = ({
  onNext,
  onPrev,
}: {
  onNext: (data: RegisterEventStep2Form) => void;
  onPrev: () => void;
}) => {
  const { eventData, updateEventData } = useRegisterEventStore();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isValid },
  } = useForm<RegisterEventStep2Form>({
    mode: "onChange", // 입력값 변경될 때마다 유효성 검사
    defaultValues: {
      mode: eventData.mode || "RESERVATION",
      openAt: eventData.openAt ?? undefined,
      breaktime: eventData.breaktime ?? 10,
      limit: eventData.limit || 0,
    },
  });

  const modeValue = watch("mode");

  useEffect(() => {
    reset({
      mode: eventData.mode || "RESERVATION",
      openAt: eventData.openAt ?? undefined,
      breaktime: eventData.breaktime || 0,
      limit: eventData.limit || 0,
    });
  }, [eventData, reset]);

  const onSubmit = (data: RegisterEventStep2Form) => {
    console.log("Step2 제출 데이터:", data);

    updateEventData({
      mode: data.mode,
      openAt: data.mode === "WAITING" ? null : data.openAt,
      breaktime: data.mode === "WAITING" ? 0 : data.breaktime,
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
          rules={{ required: true }}
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
                  ...watch(),
                  mode: value,
                  openAt: value === "WAITING" ? undefined : watch("openAt"),
                  breaktime: value === "WAITING" ? 0 : watch("breaktime"),
                  limit: value === "WAITING" ? 0 : watch("limit"),
                });
              }}
            />
          )}
        />
      </div>

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
              rules={{ required: true }}
              render={({ field }) => (
                <TimeSelectButton
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => field.onChange(date.toISOString())}
                />
              )}
            />
          </div>
          <div className={styles.containerItem}>
            <p>쉬는 시간</p>
            <p>
              * 타임당 이용 단위는 1시간으로 고정이며, 각 타임 사이에 정해진
              쉬는 시간이 포함됩니다.
            </p>
            <Controller
              name="breaktime"
              control={control}
              rules={{ required: true }}
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
          </div>

          <div className={styles.containerItem}>
            <p>타임 당 인원</p>
            <Controller
              name="limit"
              control={control}
              rules={{ required: true, min: 1 }}
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

      <ConfirmCancelButton
        onConfirm={handleSubmit(onSubmit)}
        onCancel={onPrev}
        isConfirmDisabled={!isValid}
      />
    </form>
  );
};

export default RegisterEventStep2;
