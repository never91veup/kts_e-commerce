import React from 'react';
import './Card.css';
import Text from '../Text';

export type CardProps = {
  /** Дополнительный classname */
  className?: string,
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}: CardProps) => {
  const addedClass: string = className ? `card ${className}` : 'card';
  return (
    <div className={addedClass} onClick={onClick}>
      <div className="image-wrapper">
        <img src={image}  alt='chess' />
      </div>
      <div className='content-wrapper'>
        <div className='info'>
          {captionSlot && (
            <Text className="mb-8" color="secondary" weight="medium" view="p-14">{captionSlot}</Text>
          )}
          <Text className="mb-8" color="primary" weight="medium" view="p-20" maxLines={2}>
            {title}
          </Text>
          <Text color="secondary" view="p-16" maxLines={3}>
            {subtitle}
          </Text>
        </div>
        <div className='actions'>
          {contentSlot && (
            <Text color="primary" weight="bold" view="p-18">{contentSlot}</Text>
          )}
          {actionSlot &&
            <>
              {actionSlot}
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Card;
