import React from 'react';
import classNames from 'classnames';
import Loader from '../Loader';
import './Button.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ loading, children, className, ...props }) => {
  const buttonClassName: string = classNames(
    'button-main',
    className,
    {
      'button--disabled': loading,
    }
  );

  return (
    <button className={buttonClassName} disabled={loading} {...props}>
      {loading ? (
          <>
            <Loader size="s" className="mr-8 bc-white" />
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
