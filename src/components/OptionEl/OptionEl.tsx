import * as React from 'react';
import {Option} from "components/MultiDropdown";
import styles from "./OptionEl.module.scss";

export type OptionProps = {
  option: Option;
  onClick: (value: Option["value"]) => void;
  ariaSelected: boolean;
};

const OptionEl: React.FC<OptionProps> = ({
                                           option,
                                           onClick,
                                           ariaSelected
                                         }) => {
  const optionRef = React.useRef<HTMLLIElement>(null);

  const handleClick = (
    clickedValue: Option["value"]
  ): React.MouseEventHandler<HTMLLIElement> => () => {
    onClick(clickedValue);
  };

  React.useEffect(() => {
    const option = optionRef.current;
    if (!option) return;
    const handleEnterKeyDown = (event: KeyboardEvent) => {
      if (document.activeElement === option && event.key === "Enter") {
        onClick(option.value.toString());
      }
    };

    option.addEventListener("keydown", handleEnterKeyDown);
    return () => {
      option.removeEventListener("keydown", handleEnterKeyDown);
    };
  }, [option.value, onClick]);

  return (
    <li
      className={styles.option}
      value={option.value}
      onClick={handleClick(option.value)}
      tabIndex={0}
      data-testid={`select-option-${option.value}`}
      aria-selected={ariaSelected}
      ref={optionRef}
    >
      {option.value}
    </li>
  );
};

export default OptionEl;