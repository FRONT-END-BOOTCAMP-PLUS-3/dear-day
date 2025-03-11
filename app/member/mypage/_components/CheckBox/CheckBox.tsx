import { useState } from "react";
import styles from "./CheckBox.module.scss";
import Icon from "@/components/Icon/Icon";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox = ({ checked = false, onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) onChange(newChecked);
  };

  return (
    <label className={styles.label}>
      {isChecked ? (
        <Icon id="checked" size={26} />
      ) : (
        <Icon id="not-checked" size={26} />
      )}
      <input
        className={styles.checkBox}
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
      유의사항을 전부 확인했어요
    </label>
  );
};

export default Checkbox;
