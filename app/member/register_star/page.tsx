"use client";

import StarUploadButton from "@/components/Button/StarUploadButton/StarUploadButton";
import styles from "./page.module.scss";
import Input from "@/components/Input/Input/Input";
import DateSelect from "@/components/Input/DateSelect/DateSelect";
import { useEffect, useState } from "react";
import NextButton from "@/components/Button/NextButton/NextButton";

const RegisterStarPage = () => {
  const [previewImage, setPreviewImage] = useState<string>("");
  const [starStageName, setStarStageName] = useState<string>("");
  const [starRealName, setstarRealName] = useState<string>("");
  const [starGroup, setStarGroup] = useState<string>("");
  const [starBirth, setStarBirth] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setPreviewImage(imageUrl); // 단일 이미지 업데이트
    }
  };

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  const handleDateChange = (date: string) => {
    setStarBirth(date);
  };

  useEffect(() => {
    if (previewImage && starStageName.trim() && starBirth.trim()) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [previewImage, starStageName, starBirth]);

  const addStar = () => {
    console.log(
      previewImage,
      starStageName,
      starRealName,
      starGroup,
      starBirth
    );
  };

  return (
    <>
      <div className={styles.homeContainer}>
        <form className={styles.registerStarForm}>
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
              value={starStageName}
              placeholder="스타의 활동명을 입력해주세요"
              onChange={handleChange(setStarStageName)}
            />
          </fieldset>

          <fieldset className={styles.registerstarRealName}>
            본명
            <Input
              name="registerstarRealName"
              value={starRealName || ""}
              placeholder="(선택) 스타의 본명을 입력해주세요"
              onChange={handleChange(setstarRealName)}
            />
          </fieldset>

          <fieldset className={styles.registerStarGroup}>
            그룹명
            <Input
              name="registerStarGroup"
              value={starGroup || ""}
              placeholder="(선택) 스타의 그룹명을 입력해주세요"
              onChange={handleChange(setStarGroup)}
            />
          </fieldset>

          <fieldset className={styles.registerStarBirth}>
            생일
            <DateSelect
              name="registerStarBirth"
              value={starBirth}
              onChange={handleDateChange}
            />
          </fieldset>
        </form>

        <NextButton
          onClick={addStar}
          value="스타 등록하기"
          disabled={!isFormValid}
        />
      </div>
    </>
  );
};

export default RegisterStarPage;
