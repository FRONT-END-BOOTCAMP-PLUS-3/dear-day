"use client";

import React, { useState, useEffect } from "react";
import Input from "@/components/Input/Input/Input";
import DateSelect from "@/components/Input/DateSelect/DateSelect";
import NextButton from "../NextButton/NextButton";
import { CreateStarDto } from "@/application/usecases/star/dto/CreateStarDto";
import styles from "./RegisterGroup.module.scss";

type Props = {
  previewImage: string;
  onSubmit: (form: CreateStarDto) => void;
};

const RegisterGroup = ({ previewImage, onSubmit }: Props) => {
  const [form, setForm] = useState<CreateStarDto>({
    image: "",
    stageName: "",
    realName: "",
    group: "",
    birthday: new Date(),
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (previewImage && form.stageName.trim() && form.birthday) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [previewImage, form.stageName, form.birthday]);

  const handleChange =
    (key: keyof CreateStarDto) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleDateChange = (dateStr: string) => {
    setForm((prev) => ({
      ...prev,
      birthday: new Date(dateStr),
    }));
  };

  const handleClick = () => {
    onSubmit(form); // 부모에게 form 전달
  };

  return (
    <div className={styles.personalContainer}>
      <form className={styles.formContainer}>
        <fieldset className={styles.field}>
          그룹명
          <Input
            name="stageName"
            placeholder="스타의 그룹명을 입력해주세요"
            value={form.stageName}
            onChange={handleChange("stageName")}
          />
        </fieldset>

        <fieldset className={styles.field}>
          데뷔일
          <DateSelect
            name="birthday"
            value={form.birthday.toISOString().split("T")[0]}
            onChange={handleDateChange}
          />
        </fieldset>

        <NextButton
          type="button"
          value="스타 등록하기"
          onClick={handleClick}
          disabled={!isValid}
        />
      </form>
    </div>
  );
};

export default RegisterGroup;
