"use client";

import styles from "./Tag.module.scss";

interface TagProps {
  text: string;
}

const Tag = ({ text }: TagProps) => {
  return <div className={styles.tagContainer}>{text}</div>;
};

export default Tag;
