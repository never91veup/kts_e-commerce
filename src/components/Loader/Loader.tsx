import React from 'react';
import './Loader.scss';

export type LoaderProps = {
    /** Размер */
    size?: 's' | 'm' | 'l';
    /** Дополнительный класс */
    className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size, className}) => {

  const loaderClass: string = `bc-brand loader loader-${size} ${className ? className : ''}`.trim();

  return (
    <div className={loaderClass}>
      <div className="loader-inner"></div>
    </div>
  );
};

export default Loader;
