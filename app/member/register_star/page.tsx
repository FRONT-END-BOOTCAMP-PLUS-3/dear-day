"use client";

import StarUploadButton from "@/components/Button/StarUploadButton/StarUploadButton";
import styles from "./page.module.scss";
import Input from "@/components/Input/Input/Input";
import DateSelect from "@/components/Input/DateSelect/DateSelect";
import React, { useEffect, useState } from "react";
import NextButton from "@/components/Button/NextButton/NextButton";
import { createStar } from "./_api/createStar";
import { CreateStarDto } from "@/application/usecases/star/dto/CreateStarDto";
import { useRouter } from "next/navigation";

const RegisterStarPage = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [starForm, setstarForm] = useState<CreateStarDto>({
    image: "",
    stageName: "",
    realName: "",
    group: "",
    birthday: new Date(),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl); // 단일 이미지 업데이트
    }
  };

  const handleChange =
    (key: keyof CreateStarDto) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setstarForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleDateChange = (date: string) => {
    setstarForm((prev) => ({ ...prev, birthday: new Date(date) }));
  };

  useEffect(() => {
    if (previewImage && starForm.stageName.trim() && starForm.birthday) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [previewImage, starForm.stageName, starForm.birthday]);

  const handleCreateStar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !selectedFile) return;

    try {
      await createStar(starForm, selectedFile);

      alert("스타 등록이 완료되었습니다!");
      if (window.history.length > 1) {
        router.back();
      } else {
        router.replace("/");
      }
    } catch (error) {
      console.error("스타 등록 실패(page): ", error);
    }
  };

  return (
    <>
      <div className={styles.homeContainer}>
        <form className={styles.registerStarForm} onSubmit={handleCreateStar}>
          <fieldset className={styles.registerStarImg}>
            스타이미지
            <StarUploadButton
              previewImage={previewImage}
              onChange={handleImageChange}
            />
          </fieldset>

          <fieldset className={styles.registerStarStageName}>
            활동명
            <Input
              name="registerStarStageName"
              value={starForm.stageName}
              placeholder="스타의 활동명을 입력해주세요"
              onChange={handleChange("stageName")}
            />
          </fieldset>

          <fieldset className={styles.registerstarRealName}>
            본명
            <Input
              name="registerstarRealName"
              value={starForm.realName || ""}
              placeholder="(선택) 스타의 본명을 입력해주세요"
              onChange={handleChange("realName")}
            />
          </fieldset>

          <fieldset className={styles.registerStarGroup}>
            그룹명
            <Input
              name="registerStarGroup"
              value={starForm.group || ""}
              placeholder="(선택) 스타의 그룹명을 입력해주세요"
              onChange={handleChange("group")}
            />
          </fieldset>

          <fieldset className={styles.registerStarBirth}>
            생일
            <DateSelect
              name="registerStarBirth"
              value={starForm.birthday.toISOString().split("T")[0]}
              onChange={handleDateChange}
            />
          </fieldset>

          <NextButton
            type="button"
            value="스타 등록하기"
            disabled={!isFormValid}
          />
        </form>
      </div>
    </>
  );
};

export default RegisterStarPage;
