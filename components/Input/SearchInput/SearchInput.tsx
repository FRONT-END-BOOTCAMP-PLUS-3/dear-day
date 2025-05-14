import { ChangeEvent } from "react";
import styles from "./SearchInput.module.scss";
import Icon from "@/components/Icon/Icon";

interface SearchInputProps {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onFocus?: () => void;
}

const SearchInput = ({
  value,
  onChange,
  placeholder = "좋아하는 스타의 생일카페를 찾아보세요!",
  onFocus,
}: SearchInputProps) => {
  return (
    <div className={styles.searchInputContainer}>
      <Icon id="search" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
        onFocus={onFocus}
      />
    </div>
  );
};

export default SearchInput;
