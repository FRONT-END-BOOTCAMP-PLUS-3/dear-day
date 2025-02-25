import { useState } from "react";

type UseToggle = (defaultState: boolean) => [boolean, () => void];

const useToggle: UseToggle = (defaultState: boolean) => {
  const [isOpen, setIsOpen] = useState(defaultState);
  const toggle = () => setIsOpen(!isOpen);

  return [isOpen, toggle];
};

export default useToggle;
