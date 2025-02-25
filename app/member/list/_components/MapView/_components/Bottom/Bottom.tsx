"use client";

import BottomSheet from "@/components/BottomSheet/BottomSheet";

export default function Page() {
  return (
    <div>
      {/* 바텀 시트가 열릴 때만 렌더링 */}
      <BottomSheet>
        <div>
          <p>여기에 리스트 넣기</p>
        </div>
      </BottomSheet>
    </div>
  );
}
