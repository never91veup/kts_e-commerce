import classNames from 'classnames';
import * as React from 'react';
import Loader from 'components/Loader';
import stl from 'components/Loader/Loader.module.scss';
import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
  /** Тема кнопки */
  theme?: "green" | "white";
};

const Button: React.FC<ButtonProps> = ({theme = 'green', loading, children, className, ...props}) => {
  const isGreen: boolean = theme === 'green';

  const buttonClassName: string = classNames(
    styles.buttonMain,
    className,
    {
      'buttonDisabled': loading,
    }
  );

  return (
    <button
      className={buttonClassName}
      disabled={loading} {...props}
      style={{
        backgroundColor: isGreen ? '#518581' : 'white',
        color: isGreen ? 'white' : 'black',
        border: isGreen ? 'none' : '1px solid #AFADB5',
      }}
    >
      {loading ? (
        <>
          <Loader size="s" className={`${stl.mr8} ${stl.bcWhite}`}/>
          {children}
        </>
      ) : (
        children
      )
      }
    </button>
  );
};

export default Button;
