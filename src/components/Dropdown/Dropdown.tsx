import * as React from 'react';
import {Option} from "components/MultiDropdown";
import OptionEl from "components/OptionEl";
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import styles from "./Dropdown.module.scss";

export type SelectProps = {
  selected: Option | null;
  options: Option[];
  placeholder?: string;
  onChange?: (selected: Option['value']) => void;
  onClose?: () => void;
};

const Dropdown: React.FC<SelectProps> = ({
                                           selected,
                                           options,
                                           placeholder,
                                           onClose,
                                           onChange
                                         }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const placeholderRef = React.useRef<HTMLDivElement>(null);
  const [selectedValue, setSelectedValue] = React.useState<string>("");

  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const {target} = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        isOpen && onClose?.();
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [onClose]);

  React.useEffect(() => {
    const placeholderEl = placeholderRef.current;
    if (!placeholderEl) return;

    const handleEnterKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        setIsOpen((prev) => !prev);
      }
    };
    placeholderEl.addEventListener("keydown", handleEnterKeyDown);

    return () => {
      placeholderEl.removeEventListener("keydown", handleEnterKeyDown);
    };
  }, []);

  const handleOptionClick = (value: Option['value']) => {
    setSelectedValue(value);
    setIsOpen(false);
    onChange?.(value);
  };
  const handlePlaceHolderClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsOpen((prev) => !prev);
  }

  return (
    <div
      className={styles['select__wrapper']}
      data-is-active={isOpen}
      ref={rootRef}
    >
      <div className={styles.arrow}>
        <ArrowDownIcon color="secondary"/>
      </div>
      <div
        className={styles.placeholder}
        data-selected={!!selected?.value}
        onClick={handlePlaceHolderClick}
        role='button'
        tabIndex={0}
        ref={placeholderRef}
      >
        {selected?.value || placeholder}
      </div>
      {isOpen && (
        <ul className={styles.select} data-testid="selectDropdown">
          {options.map((option: Option) => (
            <OptionEl
              key={option.key}
              option={option}
              onClick={handleOptionClick}
              ariaSelected={option.value === selectedValue}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;