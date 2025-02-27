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

// Step1에서 사용할 폼 데이터 타입 정의
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

  const { control, handleSubmit, reset, watch, setValue } =
    useForm<RegisterEventStep1Form>({
      defaultValues: {
        address: eventData.address || "",
        latitude: eventData.latitude,
        longitude: eventData.longitude,
        title: eventData.title || "",
        twitterId: eventData.twitterId || "",
        startDate: eventData.startDate ? eventData.startDate.toString() : "",
        endDate: eventData.endDate ? eventData.endDate.toString() : "",
        startTime: eventData.startTime || "",
        endTime: eventData.endTime || "",
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
        {/* 📌 주소 입력 */}
        <div className={styles.containerItem}>
          <p>장소</p>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <AddressSearchInput
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        {/* 📌 이벤트 기간 선택 */}
        <div className={styles.containerItem}>
          <p>이벤트 기간</p>
          <div className={styles.item}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DateSelectButton
                  value={new Date(field.value)}
                  onChange={field.onChange}
                />
              )}
            />
            <span>~</span>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <DateSelectButton
                  value={new Date(field.value)}
                  onChange={field.onChange}
                  minDate={new Date(startDate)}
                />
              )}
            />
          </div>
        </div>

        {/* 📌 카페 운영 시간 */}
        <div className={styles.containerItem}>
          <p>카페 운영 시간</p>
          <div className={styles.item}>
            <Controller
              name="startTime"
              control={control}
              render={({ field }) => (
                <TimeSelectButton
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => field.onChange(date.toISOString())} // Date → string 변환
                />
              )}
            />
            <span>~</span>
            <Controller
              name="endTime"
              control={control}
              render={({ field }) => (
                <TimeSelectButton
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => {
                    const startTime = watch("startTime")
                      ? new Date(watch("startTime"))
                      : null;
                    if (startTime && date < startTime) {
                      field.onChange(startTime.toISOString()); // 📌 startTime보다 빠르면 startTime으로 변경
                    } else {
                      field.onChange(date.toISOString());
                    }
                  }}
                  minTime={
                    watch("startTime")
                      ? new Date(watch("startTime"))
                      : undefined
                  } // 📌 startTime 이후만 선택 가능
                />
              )}
            />
          </div>
        </div>

        {/* 📌 생카 제목 입력 */}
        <div className={styles.containerItem}>
          <p>생카 제목</p>
          <Controller
            name="title"
            control={control}
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

        {/* 📌 주최자 계정 입력 */}
        <div className={styles.containerItem}>
          <p>주최자 계정</p>
          <Controller
            name="twitterId"
            control={control}
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

        {/* 📌 다음 버튼 */}
        <NextButton onClick={handleSubmit(onSubmit)} value="다음" />
      </div>
    </form>
  );
};

export default RegisterEventStep1;
