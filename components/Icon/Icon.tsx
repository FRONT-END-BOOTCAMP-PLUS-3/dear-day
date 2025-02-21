"use client";

import style from "@/components/Icon/Icon.module.scss";

const Icon = ({ id, size = 24 }: { id: string; size?: number }) => {
  return (
    <svg
      className={style.component}
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 24 24"
    >
      <use href={`/icons.svg#${id}`} />
    </svg>
  );
};

export default Icon;
