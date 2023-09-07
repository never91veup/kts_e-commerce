import * as React from 'react';
import './Text.css';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?:  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
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
  const viewClass: string = view ? `text-${view}` : '';
  const weightClass: string = `text-weight-${weight}`;
  const colorClass: string = color ? `text-color-${color}` : '';
  const maxLinesStyle: object = maxLines ? { overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: maxLines, WebkitBoxOrient: 'vertical' } : {};
  const combinedClassNames: string = `text ${viewClass} ${weightClass} ${colorClass} ${className || ''}`;
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
