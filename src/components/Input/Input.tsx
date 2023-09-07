import React from 'react';
import './Input.css';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
  /** Дополнительный className для корневого элемента */
  className?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    value,
    onChange,
    afterSlot,
    className,
     ...inputProps
   }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    const addedClass: string = className ? `input-container ${className}` : 'input-container';

    return (
      <div className={addedClass}>
        <input
          {...inputProps}
          type="text"
          value={value}
          onChange={handleChange}
          className="input-field"
          ref={ref}
        />
        {afterSlot && <div className="input-after-slot">{afterSlot}</div>}
      </div>
    );
  }
);

export default Input;
