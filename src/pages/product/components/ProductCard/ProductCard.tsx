import * as React from 'react';
import Text from "components/Text";
import styles from './ProductCard.module.scss';

export type ProductCardProps = {
  /** Дополнительный classname */
  className?: string,
  /** URL изображения */
  image: string;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  description?: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const ProductCard: React.FC<ProductCardProps> = ({
                                                   className,
                                                   image,
                                                   title,
                                                   description,
                                                   contentSlot,
                                                   actionSlot,
                                                 }: ProductCardProps) => {
  const addedClass: string = className ? `${styles.productCard} ${className}` : styles.productCard;

  return (
    <div className={addedClass}>
      <div className={styles.imageWrapper}>
        <img src={image} alt='Картинка'/>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.info}>
          <Text tag="h1" color="primary" weight="bold">{title}</Text>
          {description && (
            <Text tag="div" color="secondary" view="p-20" weight="normal">{description}</Text>
          )}
        </div>
        <div className={styles.actions}>
          {contentSlot && (
            <Text tag="h1" color="primary" weight="bold">${contentSlot}</Text>
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

export default ProductCard;