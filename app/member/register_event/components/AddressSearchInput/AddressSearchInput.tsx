"use client";

import { useState } from "react";
import DaumPostcode, { Address } from "react-daum-postcode"; // 📌 정확한 타입 사용
import styles from "./AddressSearchInput.module.scss";
import SearchInput from "@/components/Input/SearchInput/SearchInput";

interface AddressSearchInputProps {
  value: string;
  onChange: (value: string) => void; // ✅ 부모에서 상태 업데이트하도록 변경
}

const AddressSearchInput = ({ value, onChange }: AddressSearchInputProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 주소 선택 시 실행되는 함수
  const handleComplete = (data: Address) => {
    const selectedAddress = data.roadAddress || data.jibunAddress; // 도로명주소 우선
    onChange(selectedAddress); // ✅ Store 업데이트 X, 부모 컴포넌트에서 처리
    setIsModalOpen(false); // 검색창 닫기
  };

  return (
    <div className={styles.addressSearchContainer}>
      <SearchInput
        value={value}
        onChange={() => {}}
        onFocus={() => setIsModalOpen(true)}
        placeholder="주소를 검색하세요"
      />

      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <DaumPostcode onComplete={handleComplete} />
            <button onClick={() => setIsModalOpen(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressSearchInput;
