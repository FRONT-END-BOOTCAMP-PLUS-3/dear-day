"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import StarUploadButton from "@/components/Button/StarUploadButton/StarUploadButton";
import Tab from "./_components/Tab/Tab";
import RegisterPersonal from "./_components/RegisterPersonal/RegisterPersonal";
import RegisterGroup from "./_components/RegisterGroup/RegisterGroup";
import { CreateStarDto } from "@/application/usecases/star/dto/CreateStarDto";
import { createStar } from "./_api/createStar";

const RegisterStarPage = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (form: CreateStarDto) => {
    if (!selectedFile) {
      console.error("❌ 이미지가 선택되지 않았습니다.");
      alert("이미지를 선택해주세요.");
      return;
    }

    try {
      await createStar({ ...form, image: previewImage }, selectedFile);
      alert("스타 등록이 완료되었습니다!");
      router.replace("/");
    } catch (error) {
      console.error("스타 등록 실패:", error);
      alert("스타 등록에 실패했습니다.");
    }
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.registerStarForm}>
        <fieldset className={styles.registerStarImg}>
          스타이미지
          <StarUploadButton
            previewImage={previewImage}
            onChange={handleImageChange}
          />
        </fieldset>
      </div>
      <Tab
        tabs={[
          {
            label: "개인 스타 등록",
            content: (
              <RegisterPersonal
                previewImage={previewImage}
                onSubmit={handleSubmit}
              />
            ),
          },
          {
            label: "단체 스타 등록",
            content: (
              <RegisterGroup
                previewImage={previewImage}
                onSubmit={handleSubmit}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default RegisterStarPage;
