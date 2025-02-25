"use client";

import { useState } from "react";
import Dropdown from "./Dropdown/Dropdown";
import ListItems from "./ListItems/ListItems";

export default function ListView() {
  const [selectedOption, setSelectedOption] = useState<string | number>("전체");

  return (
    <div>
      {/* Dropdown에서 선택한 옵션을 상태로 관리 */}
      <Dropdown selectedOption={selectedOption} onSelect={setSelectedOption} />

      {/* 선택한 옵션을 ListItems에 전달 */}
      <ListItems filter={selectedOption} />
    </div>
  );
}
