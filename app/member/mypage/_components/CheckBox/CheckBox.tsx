import { useState } from "react";
import styles from "./CheckBox.module.scss";
import Icon from "@/components/Icon/Icon";

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox = ({ label, checked = false, onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) onChange(newChecked);
  };

  return (
    <label className={styles.label}>
      <Icon id="close" />
      <input
        className={styles.checkBox}
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
      {label}
    </label>
  );
};

export default Checkbox;
