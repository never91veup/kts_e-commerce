import React, { useEffect, useRef, useState } from 'react';
import Input from '../Input';
import './MultiDropdown.scss';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import Text from '../Text';

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
  disabled: initialDisabled,
  getTitle,
  ...props
 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [disabled, setDisabled] = useState(initialDisabled); // Создаем локальное состояние для disabled
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFilteredOptions(options);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [isOpen, options]);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  // Обновляем состояние disabled при изменении пропса
  useEffect(() => {
    setDisabled(initialDisabled);
  }, [initialDisabled]);

  const handleInputChange = (newValue: string) => {
    if (disabled) {
      return;
    }
    const filtered = options.filter((option) =>
      option.value.toLowerCase().includes(newValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (clickedOption: Option) => {
    const isSelected = value.some((option) => option.key === clickedOption.key);
    if (isSelected) {
      onChange(value.filter((option) => option.key !== clickedOption.key));
    } else {
      onChange([...value, clickedOption]);
    }
  };

  const handleDocumentClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const addedClass: string = className ? `multi-dropdown ${className}` : 'multi-dropdown';

  return (
    <div className={addedClass} ref={dropdownRef}>
      <Input
        id="multi"
        ref={inputRef}
        placeholder={value.length === 0 ? getTitle(value) : ""}
        value={value.length === 0 ? "" : getTitle(value)}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        disabled={disabled}
        afterSlot={<ArrowDownIcon color="secondary" />}
        {...props}
      />
      {isOpen && !disabled && (
        <ul className="dropdown-options">
          {filteredOptions.map((option) => (
            <Text
              key={option.key}
              className={value.some((selected) => selected.key === option.key) ? 'selected' : ''}
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