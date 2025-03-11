"use client";

import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";
import styles from "./Banner.module.scss";

const Banner: React.FC = () => {
  // 임시 배너 이미지
  const banners = [
    "/img/banner/1.png",
    "/img/banner/2.png",
    "/img/banner/3.png",
    "/img/banner/4.png",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [banners.length]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    },
    onSwipedRight: () => {
      setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    },
    trackMouse: true,
  });

  return (
    <div {...handlers} className={styles.container}>
      <div
        className={styles.bannerWrapper}
        style={{
          width: `${banners.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / banners.length)}%)`,
        }}
      >
        {banners.map((banner, idx) => (
          <div key={idx} className={styles.banner}>
            <Image
              src={banner}
              alt={`Banner ${idx + 1}`}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      <div className={styles.indicatorWrapper}>
        {banners.map((_, idx) => (
          <span
            key={idx}
            className={`${styles.indicator} ${
              idx === currentIndex ? styles.active : ""
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
