"use client";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./RegisterEvent.module.scss";
import { useRegisterEventStore } from "@/store/registerEventStore";
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
  const { eventData, updateEventData, isEditing } = useRegisterEventStore();
  const { startDate } = eventData;
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isValid, isDirty },
  } = useForm<RegisterEventStep2Form>({
    mode: "onChange", // 입력값 변경될 때마다 유효성 검사
    defaultValues: {
      mode: eventData.mode || "RESERVATION",
      openAt: eventData.openAt ?? undefined,
      breaktime: eventData.breaktime ?? 10,
      limit: eventData.limit || 0,
    },
  });

  // 초기 상태에서 버튼을 disabled 상태로 설정
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);
  const modeValue = watch("mode");

  const ensureNotNull = <T,>(
    value: T | null | undefined,
    defaultValue: NonNullable<T> | undefined
  ): NonNullable<T> | undefined =>
    value !== null && value !== undefined
      ? (value as NonNullable<T>)
      : defaultValue;

  useEffect(() => {
    if (isEditing) {
      setIsConfirmDisabled(false); // 수정 모드일 때 버튼 활성화
    } else if (modeValue === "WAITING") {
      setIsConfirmDisabled(false); // "대기(WAITING)" 선택 시 즉시 버튼 활성화
    } else {
      setIsConfirmDisabled(!(isValid && isDirty));
    }
  }, [modeValue, isValid, isDirty]); // mode 변경 시 즉시 반응하도록 추가

  useEffect(() => {
    if (isEditing) {
      reset({
        mode: ensureNotNull(watch("mode"), "RESERVATION"),
        openAt: ensureNotNull(watch("openAt"), undefined),
        breaktime: ensureNotNull(watch("breaktime"), 10),
        limit: ensureNotNull(watch("limit"), 0),
      });
    } else {
      reset({
        mode: eventData.mode || "RESERVATION",
        openAt: ensureNotNull(eventData.openAt, undefined),
        breaktime: ensureNotNull(eventData.breaktime, 10),
        limit: ensureNotNull(eventData.limit, 0),
      });
    }
  }, [isEditing, eventData, reset]);

  const handleModeChange = (value: string) => {
    if (isEditing) {
      setTimeout(() => {
        reset({
          mode: value,
          openAt:
            value === "WAITING"
              ? ensureNotNull(watch("openAt"), undefined)
              : ensureNotNull(eventData.openAt, undefined),
          breaktime:
            value === "WAITING"
              ? ensureNotNull(watch("breaktime"), 10)
              : ensureNotNull(eventData.breaktime, 10),
          limit:
            value === "WAITING"
              ? ensureNotNull(watch("limit"), 0)
              : ensureNotNull(eventData.limit, 0),
        });
      }, 0);
    } else {
      reset({
        mode: value,
        openAt:
          value === "WAITING"
            ? undefined
            : ensureNotNull(eventData.openAt, undefined),
        breaktime:
          value === "WAITING" ? 0 : ensureNotNull(eventData.breaktime, 10),
        limit: value === "WAITING" ? 0 : ensureNotNull(eventData.limit, 0),
      });
    }

    if (value === "WAITING") {
      setIsConfirmDisabled(false);
    }
  };

  const onSubmit = (data: RegisterEventStep2Form) => {
    updateEventData({
      mode: data.mode,
      openAt: data.mode === "WAITING" ? null : data.openAt,
      breaktime: data.mode === "WAITING" ? 0 : data.breaktime,
      limit: data.mode === "WAITING" ? 0 : data.limit,
    });

    onNext(data);
  };

  const CustomInput = ({
    value,
    onClick,
  }: {
    value?: string;
    onClick?: () => void;
  }) => (
    <button type="button" className={styles.datepicker} onClick={onClick}>
      {value && value.trim() !== "" ? value : "날짜/시간 선택"}
    </button>
  );

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
                // reset({
                //   ...watch(),
                //   mode: value,
                //   openAt: value === "WAITING" ? undefined : watch("openAt"),
                //   breaktime: value === "WAITING" ? 0 : watch("breaktime"),
                //   limit: value === "WAITING" ? 0 : watch("limit"),
                // });

                handleModeChange(value);

                if (value === "WAITING") {
                  setIsConfirmDisabled(false);
                }
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
                <DatePicker
                  selected={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => field.onChange(date?.toISOString())}
                  showTimeSelect
                  timeIntervals={30}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  popperPlacement="bottom-start"
                  minDate={new Date()}
                  maxDate={
                    startDate
                      ? new Date(
                          new Date(startDate).setDate(
                            new Date(startDate).getDate() - 1
                          )
                        )
                      : undefined
                  }
                  customInput={<CustomInput />}
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
                    { label: "10분", value: "10" },
                    { label: "15분", value: "15" },
                    { label: "20분", value: "20" },
                    { label: "없음", value: "0" },
                  ]}
                  value={String(field.value)}
                  onChange={(value) => field.onChange(Number(value))}
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
        isConfirmDisabled={isConfirmDisabled}
      />
    </form>
  );
};

export default RegisterEventStep2;
