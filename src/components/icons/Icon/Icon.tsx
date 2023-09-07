import * as React from 'react';
import './Icon.css';

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({ color, width = 24, height = 24, ...props }) => {
    const iconColorClass: string = color ? `icon icon-${color}` : 'icon';

    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
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
