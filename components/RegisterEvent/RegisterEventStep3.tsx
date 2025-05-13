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
import { useParams, usePathname, useRouter } from "next/navigation";

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
  const { event_id } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const { eventData, updateEventData, isEditing, resetEventData } =
    useRegisterEventStore();
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

  useEffect(() => {
    if (selectedMainImage) {
      updateEventData({
        ...eventData,
        mainImage: URL.createObjectURL(selectedMainImage), // Store에 반영
      });
    }
  }, [selectedMainImage]);

  useEffect(() => {
    if (selectedDetailImages.length > 0) {
      const updatedDetailImages = selectedDetailImages.map((file) =>
        URL.createObjectURL(file)
      );
      updateEventData({
        ...eventData,
        detailImage: updatedDetailImages, // Store에 반영
      });
    }
  }, [selectedDetailImages]);

  const onSubmit = async (data: RegisterEventStep3Form) => {
    console.log("isEditing:", isEditing);
    console.log("Step3 제출 데이터:", data);
    if (isSubmitting) return;
    setIsSubmitting(true); // 버튼 비활성화 (중복 제출 방지)

    await updateEventData(data);

    const formData = new FormData();

    if (selectedMainImage) formData.append("mainImage", selectedMainImage);
    selectedDetailImages.forEach((file: string | Blob) =>
      formData.append("detailImage", file)
    );

    formData.append(
      "eventData",
      JSON.stringify(useRegisterEventStore.getState().eventData)
    );

    try {
      if (isEditing) {
        const response = await fetch(
          `/api/manage/update-my-event?eventId=${event_id}`,
          {
            method: "PATCH",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("이벤트 정보를 불러오는 데 실패했습니다.");
        }

        resetEventData(); // Store 초기화
        alert("생일 카페 수정 완료!");

        if (pathname.startsWith("/member/manage/edit/")) {
          const newPath = pathname.replace("/edit", ""); // "edit" 제거
          router.replace(newPath); // 새로운 URL로 이동
        }
      } else {
        const response = await fetch("/api/event", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("이벤트 등록 실패");

        const result = await response.json();
        console.log("이벤트 등록 성공:", result);

        updateEventData({
          mainImage: result.mainImage,
          detailImage: result.detailImage,
        });

        alert("생일 카페 등록 완료!");
        useRegisterEventStore.getState().resetEventData();
        router.replace(`/member/event/${result.eventId}`);
      }
    } catch (error) {
      console.error("이벤트 등록 중 오류:", error);
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

        {/* isEditing 모드에서 기존 이미지 표시 */}
        {isEditing && !selectedMainImage && eventData.mainImage && (
          <div className={styles.imageWrapper}>
            <Image
              src={eventData.mainImage}
              alt="기존 메인 이미지"
              width={300}
              height={400}
              className={styles.previewImage}
              unoptimized
            />
          </div>
        )}

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
            {/* isEditing 모드에서 기존 이미지 표시 */}
            {isEditing &&
              eventData.detailImage &&
              eventData.detailImage.length > 0 &&
              selectedDetailImages.length === 0 &&
              eventData.detailImage.map((image, index) => (
                <div key={index} className={styles.imageWrapper}>
                  <Image
                    src={image}
                    alt={`기존 상세 이미지 ${index + 1}`}
                    width={300}
                    height={400}
                    className={styles.previewImage}
                    unoptimized
                  />
                </div>
              ))}

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
