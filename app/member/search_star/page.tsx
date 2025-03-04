"use client";

import SearchStar from "@/components/SearchStar/SearchStar";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";

const SearhStarPage = () => {
  const router = useRouter();

  const handleSelect = (id: number) => {
    router.push(`/search_star/${id}`);
  };

  return (
    <div className={styles.homeContainer}>
      <SearchStar onSelectStar={handleSelect} />
    </div>
  );
};

export default SearhStarPage;
