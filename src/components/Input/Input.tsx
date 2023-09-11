import * as React from 'react';
import styles from './Input.module.scss';

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

    const addedClass: string = className ? `${styles.inputContainer} ${className}` : styles.inputContainer;

    return (
      <div className={addedClass}>
        <input
          {...inputProps}
          type="text"
          value={value}
          onChange={handleChange}
          className={styles.inputField}
          ref={ref}
        />
        {afterSlot && <div className={styles.inputAfterSlot}>{afterSlot}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
