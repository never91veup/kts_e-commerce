import * as React from 'react';
import styles from './Text.module.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
  onClick?: () => void;
};

const Text: React.FC<TextProps> = ({
                                     className,
                                     view,
                                     tag,
                                     weight,
                                     color,
                                     maxLines,
                                     children,
                                     onClick
                                   }) => {
  const viewClass: string = view ? styles[`text-${view}`] : '';
  const weightClass: string = weight ? styles[`text-weight-${weight}`] : '';
  const colorClass: string = color ? styles[`text-color-${color}`] : '';
  const maxLinesStyle: React.CSSProperties = maxLines
    ? {
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: maxLines,
      lineHeight: '120%'
    }
    : {};
  const combinedClassNames: string = `${styles.text} ${viewClass} ${weightClass} ${colorClass} ${className || ''}`.trim();
  const Tag = tag ? tag : 'p';

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Tag className={combinedClassNames} style={maxLinesStyle} onClick={handleClick}>
      {children}
    </Tag>
  );
}

export default Text;
