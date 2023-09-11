import * as React from 'react';
import Text from 'components/Text';
import stl from 'components/Text/Text.module.scss';
import styles from './ListCard.module.scss';

export type ListCardProps = {
  /** Дополнительный classname */
  className?: string,
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle?: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const ListCard: React.FC<ListCardProps> = ({
                                             className,
                                             image,
                                             captionSlot,
                                             title,
                                             subtitle,
                                             contentSlot,
                                             onClick,
                                             actionSlot,
                                           }: ListCardProps) => {
  const addedClass: string = className ? `${styles.listCard} ${className}` : styles.listCard;

  return (
    <div className={addedClass} onClick={onClick}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={`Картинка: ${title}`}/>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.info}>
          {captionSlot && (
            <Text className={stl.mb8} color="secondary" weight="medium" view="p-14">{captionSlot}</Text>
          )}
          <Text className={stl.mb8} color="primary" weight="medium" view="p-20" maxLines={2}>
            {title}
          </Text>
          {subtitle && (
            <Text color="secondary" view="p-16" weight="normal" maxLines={3}>{subtitle}</Text>
          )}
        </div>
        <div className={styles.actions}>
          {contentSlot && (
            <Text color="primary" weight="bold" view="p-18">${contentSlot}</Text>
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

export default ListCard;
