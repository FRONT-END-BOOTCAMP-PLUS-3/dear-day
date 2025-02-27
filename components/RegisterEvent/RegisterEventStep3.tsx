"use client";
import { useRegisterEventStore } from "@/store/registerEventStore";
import PosterUploadButton from "../Button/PosterUploadButton/PosterUploadButton";
import styles from "./RegisterEvent.module.scss";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Image from "next/image";
import Icon from "../Icon/Icon";
import CheckboxTag from "../Tag/CheckboxTag/CheckboxTag";

interface RegisterEventStep3Form {
  mainImage: string;
  detailImage: string[];
  benefits: string[];
}

const RegisterEventStep3 = ({
  onNext,
}: {
  onNext: (data: RegisterEventStep3Form) => void;
}) => {
  const { eventData, updateEventData } = useRegisterEventStore();
  const [isChecked, setIsChecked] = useState(false);
  const { control, handleSubmit, reset } = useForm<RegisterEventStep3Form>({
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

  const onSubmit = (data: RegisterEventStep3Form) => {
    console.log("Step3 제출 데이터:", data);

    updateEventData({
      mainImage: data.mainImage,
      detailImage: data.detailImage,
      benefits: data.benefits,
    });

    onNext(data);
  };

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
          render={({ field: { value, onChange } }) => (
            <>
              <PosterUploadButton
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    onChange(imageUrl); // useForm에 저장
                  }
                }}
              />
              {value && (
                <div className={styles.imageWrapper}>
                  <Image
                    src={value}
                    alt="메인 이미지 미리보기"
                    width={300}
                    height={400}
                    objectFit="cover"
                    className={styles.previewImage}
                  />
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => onChange("")} // 삭제 버튼 클릭 시 mainImage 초기화
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
          render={({ field: { value, onChange } }) => (
            <>
              <PosterUploadButton
                onChange={(e) => {
                  const files = e.target.files;
                  if (files) {
                    const newImages = Array.from(files)
                      .slice(0, 4 - value.length) // 최대 4개 제한
                      .map((file) => URL.createObjectURL(file));

                    onChange([...value, ...newImages]); // useForm에 저장
                  }
                }}
              />
              <div className={styles.imageScrollContainer}>
                <div className={styles.imagePreviewContainer}>
                  {value.map((img, index) => (
                    <div key={index} className={styles.imageWrapper}>
                      <Image
                        src={img}
                        alt={`상세 이미지 ${index + 1}`}
                        width={150} // ✅ 이미지 크기 조정
                        height={200}
                        objectFit="cover"
                        className={styles.previewImage}
                      />
                      <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() =>
                          onChange(value.filter((_, i) => i !== index))
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

      <div className={styles.containerItem}>
        <p>특전</p>
        <div className={styles.benefits}>
          <CheckboxTag
            label="컵홀더"
            checked={isChecked}
            onChange={setIsChecked}
          />
          <CheckboxTag
            label="컵홀더"
            checked={isChecked}
            onChange={setIsChecked}
          />
          <CheckboxTag
            label="컵홀더"
            checked={isChecked}
            onChange={setIsChecked}
          />
          <CheckboxTag
            label="컵홀더"
            checked={isChecked}
            onChange={setIsChecked}
          />
          <CheckboxTag
            label="컵홀더"
            checked={isChecked}
            onChange={setIsChecked}
          />
          <CheckboxTag
            label="컵홀더"
            checked={isChecked}
            onChange={setIsChecked}
          />
          <CheckboxTag
            label="컵홀더"
            checked={isChecked}
            onChange={setIsChecked}
          />
          <CheckboxTag
            label="컵홀더"
            checked={isChecked}
            onChange={setIsChecked}
          />
        </div>
      </div>
    </form>
  );
};

export default RegisterEventStep3;
