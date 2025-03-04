"use client";

import SearchStar from "@/components/SearchStar/SearchStar";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { searchStarListDto } from "@/application/usecases/star/dto/SearchStarListDto";
import { searchStarByKeyword } from "./_api/searchStarByKeyword";
import { useRouter } from "next/navigation";

const SearhStarPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState(""); // 검색어 상태
  const [results, setResults] = useState<searchStarListDto[]>([]); // 검색 결과 상태
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  console.log("검색어: ", query);

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedQuery.trim()) {
        const data = await searchStarByKeyword(debouncedQuery);
        setResults(data); // ✅ 검색 결과 업데이트
        console.log("검색 결과: ", data);
      } else {
        setResults([]);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  const handleSelect = (id: number) => {
    console.log("선택된 스타 ID: ", id);
    router.push(`/search_star/${id}`);
  };

  return (
    <div className={styles.homeContainer}>
      <SearchStar
        query={query}
        setQuery={setQuery}
        results={results}
        onSelectStar={handleSelect}
        isLoading={false}
      />
    </div>
  );
};

export default SearhStarPage;
