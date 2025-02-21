import DatePicker from "react-datepicker";
import { ModalContent } from "./Modal.type";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

type ModalTypeProps = {
  content: ModalContent;
  onChange: (name: string, value: string) => void;
};

const ModalType = ({ content, onChange }: ModalTypeProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  if (content.type === "textOnly") {
    return null;
  }

  if (content.type === "input") {
    return (
      <input
        type="input"
        name="modal_text"
        maxLength={content.maxLength}
        onChange={(e) => onChange(e.target.name, e.target.value)}
      />
    );
  }

  if (content.type === "calendar") {
    return (
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          onChange("calendarValue", date ? date.toISOString() : "");
        }}
        placeholderText={content.placeholder || "날짜 선택"}
      />
    );
  }

  return null;
};

export default ModalType;
