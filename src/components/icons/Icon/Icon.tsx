import * as React from 'react';
import styles from './Icon.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  width?: string;
  height?: string;
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({ color, width = 24, height = 24, ...props }) => {
  const iconColorClass: string = color ? `${styles.icon} ${styles[`icon-${color}`]}` : styles.icon;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${iconColorClass} ${props.className || ''}`}
      {...props}
    >
      {props.children}
    </svg>
  );
};

export default Icon;
