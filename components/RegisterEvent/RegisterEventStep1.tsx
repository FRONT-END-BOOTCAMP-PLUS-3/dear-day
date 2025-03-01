"use client";

import styles from "./RegisterEvent.module.scss";
import Input from "../Input/Input/Input";
import NextButton from "../Button/NextButton/NextButton";
import { Controller, useForm } from "react-hook-form";
import DateSelectButton from "../ComboBox/DateComboBox/DateComboBox";
import TimeSelectButton from "../ComboBox/TimeComboBox/TimeComboBox";
import { useRegisterEventStore } from "@/store/registerEventStore";
import { useEffect } from "react";
import AddressSearchInput from "@/app/member/register_event/components/AddressSearchInput/AddressSearchInput";

export interface RegisterEventStep1Form {
  address: string;
  latitude: number;
  longitude: number;
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
  const { eventData, updateEventData } = useRegisterEventStore();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<RegisterEventStep1Form>({
    mode: "onChange",
    defaultValues: {
      address: eventData?.address || "",
      latitude: eventData?.latitude || 0,
      longitude: eventData?.longitude || 0,
      title: eventData?.title || "",
      twitterId: eventData?.twitterId || "",
      startDate: eventData?.startDate ? eventData.startDate.toString() : "",
      endDate: eventData?.endDate ? eventData.endDate.toString() : "",
      startTime: eventData?.startTime || "",
      endTime: eventData?.endTime || "",
    },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  useEffect(() => {
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      setValue("endDate", startDate);
    }
  }, [startDate, endDate, setValue]);

  useEffect(() => {
    if (eventData && Object.keys(eventData).length > 0) {
      reset({
        address: eventData.address || "",
        latitude: eventData.latitude,
        longitude: eventData.longitude,
        title: eventData.title || "",
        twitterId: eventData.twitterId || "",
        startDate: eventData.startDate
          ? eventData.startDate.toISOString().split("T")[0]
          : "",
        endDate: eventData.endDate
          ? eventData.endDate.toISOString().split("T")[0]
          : "",
        startTime: eventData.startTime || "",
        endTime: eventData.endTime || "",
      });
    }
  }, [eventData, reset]);

  const onSubmit = (data: RegisterEventStep1Form) => {
    updateEventData({
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      title: data.title,
      twitterId: data.twitterId,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
      startTime: data.startTime,
      endTime: data.endTime,
    });

    onNext(data);
  };
  return (
    <form id="step1-form" onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        {/* 주소 */}
        <div className={styles.containerItem}>
          <p>장소</p>
          <Controller
            name="address"
            control={control}
            rules={{ required: "주소를 입력해주세요." }}
            render={({ field }) => (
              <AddressSearchInput
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        {/* 이벤트 기간 */}
        <div className={styles.containerItem}>
          <p>이벤트 기간</p>
          <div className={styles.item}>
            <Controller
              name="startDate"
              control={control}
              rules={{ required: "시작 날짜를 선택해주세요." }}
              render={({ field }) => (
                <DateSelectButton
                  value={field.value ? new Date(field.value) : null}
                  onChange={field.onChange}
                />
              )}
            />
            <span>~</span>
            <Controller
              name="endDate"
              control={control}
              rules={{ required: "종료 날짜를 선택해주세요." }}
              render={({ field }) => (
                <DateSelectButton
                  value={field.value ? new Date(field.value) : null}
                  onChange={field.onChange}
                  minDate={new Date(startDate)}
                />
              )}
            />
          </div>
        </div>

        {/* 카페 운영 시간 */}
        <div className={styles.containerItem}>
          <p>카페 운영 시간</p>
          <div className={styles.item}>
            <Controller
              name="startTime"
              control={control}
              rules={{ required: "운영 시작 시간을 선택해주세요." }}
              render={({ field }) => (
                <TimeSelectButton
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => field.onChange(date.toISOString())}
                />
              )}
            />
            <span>~</span>
            <Controller
              name="endTime"
              control={control}
              rules={{ required: "운영 종료 시간을 선택해주세요." }}
              render={({ field }) => (
                <TimeSelectButton
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => {
                    const startTime = watch("startTime")
                      ? new Date(watch("startTime"))
                      : null;
                    if (startTime && date < startTime) {
                      field.onChange(startTime.toISOString()); // startTime보다 빠르면 startTime으로 변경
                    } else {
                      field.onChange(date.toISOString());
                    }
                  }}
                  minTime={
                    watch("startTime")
                      ? new Date(watch("startTime"))
                      : undefined
                  } // startTime 이후만 선택 가능
                />
              )}
            />
          </div>
        </div>

        {/* 생카 제목 */}
        <div className={styles.containerItem}>
          <p>생카 제목</p>
          <Controller
            name="title"
            control={control}
            rules={{ required: "생일 카페 제목을 입력해주세요." }}
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                placeholder="생일 카페 타이틀을 입력해주세요"
                name={""}
              />
            )}
          />
        </div>

        {/* 주최자 계정 */}
        <div className={styles.containerItem}>
          <p>주최자 계정</p>
          <Controller
            name="twitterId"
            control={control}
            rules={{ required: "주최자의 X(구 twitter) 계정을 입력해주세요." }}
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                placeholder="주최자의 X(구 twitter)계정을 입력해주세요"
                name={""}
              />
            )}
          />
        </div>

        <NextButton
          onClick={handleSubmit(onSubmit)}
          value="다음"
          disabled={!isValid}
        />
      </div>
    </form>
  );
};

export default RegisterEventStep1;
