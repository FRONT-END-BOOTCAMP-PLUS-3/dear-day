"use client";
import { useRegisterEventStore } from "@/store/registerEventStore";
import PosterUploadButton from "../Button/PosterUploadButton/PosterUploadButton";
import styles from "./RegisterEvent.module.scss";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import Image from "next/image";
import Icon from "../Icon/Icon";
import CheckboxTag from "../Tag/CheckboxTag/CheckboxTag";
import ConfirmCancelButton from "@/app/member/register_event/components/ConfirmCancelButton/ConfirmCancelBytton";

export interface RegisterEventStep3Form {
  mainImage: string;
  detailImage: string[];
  benefits: string[];
}

const RegisterEventStep3 = ({
  onNext,
  onPrev,
}: {
  onNext: (data: RegisterEventStep3Form) => void;
  onPrev: () => void;
}) => {
  const { eventData, updateEventData } = useRegisterEventStore();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isValid },
  } = useForm<RegisterEventStep3Form>({
    mode: "onChange",
    defaultValues: {
      mainImage: eventData.mainImage || "",
      detailImage: eventData.detailImage || [],
      benefits: eventData.benefits || [],
    },
  });

  useEffect(() => {
    reset({
      mainImage: eventData.mainImage || "",
      detailImage: eventData.detailImage || [],
      benefits: eventData.benefits || [],
    });
  }, [eventData, reset]);

  const onSubmit = async (data: RegisterEventStep3Form) => {
    console.log("Step3 제출 데이터:", data);

    // Store 업데이트
    await updateEventData({
      mainImage: data.mainImage,
      detailImage: data.detailImage,
      benefits: data.benefits,
    });

    // 스토어에서 전체 데이터 가져오기
    const eventData = useRegisterEventStore.getState().eventData;

    try {
      // API 호출
      const response = await fetch("/api/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error("이벤트 등록 실패");
      }

      console.log("이벤트 등록 성공");
      onNext(data);
    } catch (error) {
      console.error("이벤트 등록 중 오류:", error);
    }
  };

  // watch를 통해 모든 입력 값 확인
  const mainImage = watch("mainImage");
  const detailImages = watch("detailImage");
  const benefits = watch("benefits");

  return (
    <form
      id="step3-form"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.container}
    >
      {/* 메인 이미지 업로드 */}
      <div className={styles.containerItem}>
        <p>메인 이미지</p>
        <Controller
          name="mainImage"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange } }) => (
            <>
              <PosterUploadButton
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    onChange(imageUrl);
                  }
                }}
              />
              {mainImage && (
                <div className={styles.imageWrapper}>
                  <Image
                    src={mainImage}
                    alt="메인 이미지 미리보기"
                    width={300}
                    height={400}
                    objectFit="cover"
                    className={styles.previewImage}
                  />
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => onChange("")}
                  >
                    <Icon id={"close"} />
                  </button>
                </div>
              )}
            </>
          )}
        />
      </div>

      {/* 상세 이미지 업로드 (최대 4개) */}
      <div className={styles.containerItem}>
        <p>상세 이미지 (최대 4개)</p>
        <Controller
          name="detailImage"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <>
              <PosterUploadButton
                onChange={(e) => {
                  const files = e.target.files;
                  if (files) {
                    const newImages = Array.from(files)
                      .slice(0, 4 - value.length)
                      .map((file) => URL.createObjectURL(file));

                    onChange([...value, ...newImages]);
                  }
                }}
              />
              <div className={styles.imageScrollContainer}>
                <div className={styles.imagePreviewContainer}>
                  {detailImages.map((img, index) => (
                    <div key={index} className={styles.imageWrapper}>
                      <Image
                        src={img}
                        alt={`상세 이미지 ${index + 1}`}
                        width={150}
                        height={200}
                        objectFit="cover"
                        className={styles.previewImage}
                      />
                      <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() =>
                          onChange(detailImages.filter((_, i) => i !== index))
                        }
                      >
                        <Icon id={"close"} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        />
      </div>

      {/* 특전 선택 */}
      <div className={styles.containerItem}>
        <p>특전</p>
        <Controller
          name="benefits"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange } }) => (
            <div className={styles.benefits}>
              {["컵홀더", "포토카드", "스티커", "포스터", "키링", "코스터"].map(
                (benefit) => (
                  <CheckboxTag
                    key={benefit}
                    label={benefit}
                    checked={benefits.includes(benefit)}
                    onChange={(checked) => {
                      onChange(
                        checked
                          ? [...benefits, benefit]
                          : benefits.filter((b) => b !== benefit)
                      );
                    }}
                  />
                )
              )}
            </div>
          )}
        />
      </div>

      <ConfirmCancelButton
        onConfirm={handleSubmit(onSubmit)}
        onCancel={onPrev}
        isConfirmDisabled={!isValid}
      />
    </form>
  );
};

export default RegisterEventStep3;
