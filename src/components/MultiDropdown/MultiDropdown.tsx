import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Input from 'components/Input';
import Text from 'components/Text';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import styles from './MultiDropdown.module.scss';

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  className?: string;
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
                                                       className,
                                                       options,
                                                       value,
                                                       onChange,
                                                       disabled,
                                                       getTitle,
                                                       ...props
                                                     }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return (): void => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleInputChange = (newValue: string): void => {
    if (disabled) {
      return;
    }
    setInputValue(newValue);
    setIsOpen(true);
  };

  const handleOptionClick = (clickedOption: Option): void => {
    setSelectedOption(clickedOption);
    setInputValue(clickedOption.value);
    setIsOpen(false);
  };

  const handleDocumentClick = (event: MouseEvent): void => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const addedClass: string = className ? `${styles['multi-dropdown']} ${className}` : styles['multi-dropdown'];

  return (
    <div className={addedClass} ref={dropdownRef}>
      <Input
        id="multi"
        ref={inputRef}
        placeholder={value.length === 0 ? getTitle(value) : ""}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        disabled={disabled}
        afterSlot={<ArrowDownIcon color="secondary"/>}
        {...props}
      />
      {isOpen && !disabled && (
        <ul className={styles['dropdown-options']}>
          {options.map((option: Option) => (
            <Text
              key={option.key}
              className={selectedOption?.key === option.key ? `${styles['multiText']} ${styles['selected']}` : styles['multiText']}
              onClick={() => handleOptionClick(option)}
            >
              {option.value}
            </Text>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiDropdown;