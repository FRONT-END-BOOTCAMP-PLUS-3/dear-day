"use client";

import BottomSheet from "@/components/BottomSheet/BottomSheet";
import ListView from "../../../ListView/ListView";

export default function Page() {
  return (
    <div>
      {/* 바텀 시트가 열릴 때만 렌더링 */}
      <BottomSheet>
        <ListView />
      </BottomSheet>
    </div>
  );
}
