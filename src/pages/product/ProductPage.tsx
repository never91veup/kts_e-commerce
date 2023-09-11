import * as React from 'react';
import {useEffect, useState} from "react";
import {Link, useParams} from 'react-router-dom';
import Button from "components/Button";
import Text from "components/Text";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import {fetchOneItem} from "http/itemApi.ts";
import {IProduct} from "store/ItemStore.ts";
import ProductCard from "./components/ProductCard";
import styles from "./ProductPage.module.scss";

const ProductPage: React.FC = () => {
  const {id} = useParams<string>();
  const [product, setProduct] = useState<IProduct>({
    id: 0,
    category: {
      id: 0,
      image: "",
      name: "",
      creationAt: "",
      updatedAt: ""
    },
    description: "",
    images: [],
    price: 0,
    title: "",
    creationAt: "",
    updatedAt: ""
  });

  useEffect((): void => {
    fetchOneItem(id).then(data => {
      setProduct(data);
    });
  }, [id]);

  return (
    <div className={styles.main}>
      <div className={styles.mainContainer}>
        <Link className={styles.back} to="/products">
          <ArrowRightIcon width="32" height="32"/>
          <Text tag="div" view="p-20" weight="normal">Назад</Text>
        </Link>
        <div className={styles.content}>
          <ProductCard
            image={product.images[0]}
            title={product.title}
            description={product.description}
            contentSlot={product.price}
            actionSlot={
              <div className={styles.buttons}>
                <Button>
                  <Text maxLines={1} view="button" tag="div" weight="normal">Buy Now</Text>
                </Button>
                <Button theme="white">
                  <Text maxLines={1} view="button" tag="div" weight="normal">Add to Cart</Text>
                </Button>
              </div>
            }
          />
          <div className={styles.relatedItems}>
            <Text tag="div" view="title" weight="bold">Related Items</Text>
            <div className={styles.items}>
              Products to Category
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;