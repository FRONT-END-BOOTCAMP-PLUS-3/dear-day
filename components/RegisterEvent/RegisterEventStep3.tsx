"use client";
import { useRegisterEventStore } from "@/store/registerEventStore";
import PosterUploadButton from "../Button/PosterUploadButton/PosterUploadButton";
import styles from "./RegisterEvent.module.scss";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Image from "next/image";
import Icon from "../Icon/Icon";
import CheckboxTag from "../Tag/CheckboxTag/CheckboxTag";
import ConfirmCancelButton from "@/app/member/register_event/components/ConfirmCancelButton/ConfirmCancelBytton";
import { BENEFITS } from "@/constants/benefits";
import { useRouter } from "next/navigation";

export interface RegisterEventStep3Form {
  mainImage: string;
  detailImage: string[];
  benefits: string[];
}

const RegisterEventStep3 = ({
  onPrev,
}: {
  onNext: (data: RegisterEventStep3Form) => void;
  onPrev: () => void;
}) => {
  const { eventData, updateEventData } = useRegisterEventStore();
  const router = useRouter();
  const [selectedMainImage, setSelectedMainImage] = useState<File | null>(null);
  const [selectedDetailImages, setSelectedDetailImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedMainImage(file);
    }
  };

  const handleDetailImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(
        0,
        4 - selectedDetailImages.length
      );
      setSelectedDetailImages((prev) => [...prev, ...files]);
    }
  };

  const {
    control,
    handleSubmit,
    reset,
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
    if (isSubmitting) return;
    setIsSubmitting(true); // 버튼 비활성화 (중복 제출 방지)

    updateEventData({
      ...eventData,
      ...data,
    });

    const formData = new FormData();

    if (selectedMainImage) formData.append("mainImage", selectedMainImage);
    selectedDetailImages.forEach((file: string | Blob) =>
      formData.append("detailImage", file)
    );

    formData.append(
      "eventData",
      JSON.stringify({
        ...useRegisterEventStore.getState().eventData,
      })
    );

    try {
      const response = await fetch("/api/event", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("이벤트 등록 실패");

      const result = await response.json();

      updateEventData({
        ...eventData,
        ...data,
      });
      console.log("스탭3", eventData);
      alert("생일 카페 등록 완료!");
      useRegisterEventStore.getState().resetEventData();
      router.replace(`/member/event/${result.eventId}`);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 이벤트 등록 중 요류:", error);
      }
      setIsSubmitting(false);
    }
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
        <PosterUploadButton onChange={handleMainImageChange} />
        {selectedMainImage && (
          <div className={styles.imageWrapper}>
            <Image
              src={URL.createObjectURL(selectedMainImage)}
              alt="메인 이미지 미리보기"
              width={300}
              height={400}
              className={styles.previewImage}
              unoptimized
            />
            <button
              type="button"
              className={styles.deleteButton}
              onClick={() => setSelectedMainImage(null)}
            >
              <Icon id={"close"} />
            </button>
          </div>
        )}
      </div>

      {/* 상세 이미지 업로드 (최대 4개) */}
      <div className={styles.containerItem}>
        <p>상세 이미지 (최대 4개)</p>
        <PosterUploadButton onChange={handleDetailImagesChange} />
        <div className={styles.imageScrollContainer}>
          <div className={styles.imagePreviewContainer}>
            {selectedDetailImages.map((file, index) => (
              <div key={index} className={styles.imageWrapper}>
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`상세 이미지 ${index + 1}`}
                  width={300}
                  height={400}
                  className={styles.previewImage}
                  unoptimized
                />
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => {
                    const updatedImages = selectedDetailImages.filter(
                      (_, i) => i !== index
                    );
                    setSelectedDetailImages(updatedImages);
                  }}
                >
                  <Icon id={"close"} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 특전 선택 */}
      <div className={styles.benefitListContainer}>
        <p>특전</p>
        <Controller
          name="benefits"
          control={control}
          rules={{ required: true }}
          defaultValue={eventData.benefits || []} // ✅ defaultValue 추가
          render={({ field: { onChange, value } }) => (
            <div className={styles.benefits}>
              {BENEFITS.map((benefit) => (
                <CheckboxTag
                  key={benefit}
                  label={benefit}
                  checked={value.includes(benefit)}
                  onChange={(checked) => {
                    const updatedBenefits = checked
                      ? [...value, benefit]
                      : value.filter((b) => b !== benefit);

                    onChange(updatedBenefits);
                  }}
                />
              ))}
            </div>
          )}
        />
      </div>

      <ConfirmCancelButton
        onConfirm={handleSubmit(onSubmit)}
        onCancel={onPrev}
        isConfirmDisabled={!isValid || isSubmitting}
      />
    </form>
  );
};

export default RegisterEventStep3;
