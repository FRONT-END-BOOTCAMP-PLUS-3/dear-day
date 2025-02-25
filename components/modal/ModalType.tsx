import { ModalContent } from "./Modal.type";
import "react-datepicker/dist/react-datepicker.css";
import DateSelect from "../Input/DateSelect/DateSelect";
import Input from "../Input/Input/Input";
import { useState } from "react";

type ModalTypeProps = {
  content: ModalContent;
  onChange: (name: string, value: string) => void;
};

const ModalType = ({ content, onChange }: ModalTypeProps) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e.target.name, e.target.value);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    onChange("modal_calendar", date);
  };

  if (content.type === "textOnly") {
    return null;
  }

  if (content.type === "text") {
    return (
      <Input
        value={inputValue}
        name="modal_text"
        onChange={handleInputChange}
        placeholder="코스 이름을 입력해 주세요"
      />
    );
  }

  if (content.type === "calendar") {
    return (
      <DateSelect
        value={selectedDate}
        name="modal_calendar"
        onChange={handleDateChange}
      />
    );
  }

  return null;
};

export default ModalType;
