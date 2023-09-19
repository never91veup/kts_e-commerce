import {observer} from 'mobx-react-lite';
import * as React from 'react'
import {IProduct} from "store/ItemStore.ts";
import Item from "../Item";
import styles from "./ItemList.module.scss";

export interface IProdProps {
  items: IProduct[];
}

const ItemList: React.FC<IProdProps> = observer(({items}) => {

  return (
    <ul className={styles.itemsContainer}>
      {items.map((product: IProduct) => (
        <Item key={product.id} product={product}/>
      ))}
    </ul>
  );
});

export default ItemList;