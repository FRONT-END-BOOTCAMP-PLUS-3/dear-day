"use client";

import { useEffect, useState } from "react";
import styles from "./SearchStar.module.scss";
import SearchInput from "../Input/SearchInput/SearchInput";
import Image from "next/image";

const SearchStar = () => {
  const [query, setQuery] = useState(""); // ✅ 검색어 상태
  // const [results, setResults] = useState<string[]>([]); // ✅ 검색 결과 상태
  // const [debouncedQuery, setDebouncedQuery] = useState(query);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setDebouncedQuery(query);
  //   }, 300);

  //   return () => clearTimeout(timer);
  // }, [query]);

  // useEffect(() => {
  //   if (debouncedQuery) {
  //     fetch(`/api/search?query=${debouncedQuery}`)
  //       .then((res) => res.json())
  //       .then((data) => setResults(data))
  //       .catch((error) => console.error("검색 오류:", error));
  //   } else {
  //     setResults([]);
  //   }
  // }, [debouncedQuery]);

  return (
    <>
      <SearchInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={"스타의 이름을 검색하세요"}
      />

      {query && (
        <ul className={styles.searchStarContainer}>
          {results.length > 0 ? (
            results.map((item) => (
              <li key={item.id} className={styles.searchStarItem}>
                <Image
                  className={styles.searchStarItemImg}
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                />
                <span>{item.name}</span>
              </li>
            ))
          ) : (
            <li className={styles.searchStarNoItem}>
              <p>결과 없음</p>
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default SearchStar;
