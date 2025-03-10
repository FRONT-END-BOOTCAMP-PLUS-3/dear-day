"use client";

import styles from "./RegisterEvent.module.scss";
import Input from "../Input/Input/Input";
import NextButton from "../Button/NextButton/NextButton";
import { Controller, useForm } from "react-hook-form";
import DateSelectButton from "../ComboBox/DateComboBox/DateComboBox";
import TimeSelectButton from "../ComboBox/TimeComboBox/TimeComboBox";
import { useRegisterEventStore } from "@/store/registerEventStore";
import { useEffect } from "react";
import LocationSearch from "@/app/member/register_event/components/LocationSearch/LocationSearch";

export interface RegisterEventStep1Form {
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
  title: string;
  twitterId: string;
  startDate: Date;
  endDate: Date;
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
    watch,
    setValue,
    formState: { isValid },
  } = useForm<RegisterEventStep1Form>({
    mode: "onChange",
    defaultValues: {
      placeName: eventData?.placeName || "",
      address: eventData?.address || "",
      latitude: eventData?.latitude || 0,
      longitude: eventData?.longitude || 0,
      title: eventData?.title || "",
      twitterId: eventData?.twitterId || "",
      startDate: eventData?.startDate || null,
      endDate: eventData?.endDate || null,
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

  // store 값이 변경될 때 form 값도 자동 업데이트
  useEffect(() => {
    if (eventData) {
      setValue("placeName", eventData.placeName || "");
      setValue("address", eventData.address || "");
      setValue("latitude", eventData.latitude || 0);
      setValue("longitude", eventData.longitude || 0);
    }
  }, [eventData, setValue]);

  const onSubmit = (data: RegisterEventStep1Form) => {
    console.log("Step1 제출 데이터:", data);
    updateEventData({
      placeName: data.placeName,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      title: data.title,
      twitterId: data.twitterId,
      startDate: data.startDate,
      endDate: data.endDate,
      startTime: data.startTime,
      endTime: data.endTime,
    });

    onNext(data);
  };

  return (
    <form id="step1-form" onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        {/* 주소 검색 */}
        <div className={styles.containerItem}>
          <p>장소</p>
          <Controller
            name="placeName"
            control={control}
            rules={{ required: "장소명을 입력해주세요." }}
            render={({ field }) => (
              <LocationSearch
                value={{
                  placeName: field.value,
                  address: watch("address"),
                  latitude: watch("latitude"),
                  longitude: watch("longitude"),
                }}
                onChange={(value) => {
                  setValue("placeName", value.placeName);
                  setValue("address", value.address);
                  setValue("latitude", value.latitude);
                  setValue("longitude", value.longitude);
                  updateEventData({
                    placeName: value.placeName,
                    address: value.address,
                    latitude: value.latitude,
                    longitude: value.longitude,
                  });
                }}
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
                  minDate={new Date()}
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
                  value={
                    field.value
                      ? new Date(`1970-01-01T${field.value}:00`)
                      : undefined
                  }
                  onChange={(date) => {
                    const formattedTime = date.toTimeString().slice(0, 5);
                    field.onChange(formattedTime);
                  }}
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
                  value={
                    field.value
                      ? new Date(`1970-01-01T${field.value}:00`)
                      : undefined
                  }
                  onChange={(date) => {
                    const startTime = watch("startTime")
                      ? new Date(`1970-01-01T${watch("startTime")}:00`)
                      : null;

                    const formattedTime = date.toTimeString().slice(0, 5);

                    if (startTime && date < startTime) {
                      field.onChange(startTime.toTimeString().slice(0, 5));
                    } else {
                      field.onChange(formattedTime);
                    }
                  }}
                  minTime={
                    watch("startTime")
                      ? new Date(`1970-01-01T${watch("startTime")}:00`)
                      : undefined
                  }
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
                name=""
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
                placeholder="주최자의 X(구 twitter) 계정을 입력해주세요"
                name=""
              />
            )}
          />
        </div>
        <NextButton
          onClick={handleSubmit(onSubmit)}
          value="다음"
          disabled={!isValid}
          type={"button"}
        />
      </div>
    </form>
  );
};

export default RegisterEventStep1;
