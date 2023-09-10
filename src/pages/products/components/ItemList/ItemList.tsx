import { observer } from 'mobx-react-lite';
import * as React from 'react'
// import { useContext } from "react";
import {uid} from "uid";
// import { Context, IAppContext } from "../../../../main.tsx";
import { IProduct } from "../../../../store/ItemStore.ts";
import Item from "../Item";
import styles from "./ItemList.module.scss";

export interface IProdProps {
  items: IProduct[];
}

const ItemList: React.FC<IProdProps> = observer(({ items }) => {
  // const { item } = useContext(Context) as IAppContext;

  return (
    <ul className={styles.itemsContainer}>
      {items.map((product: IProduct) => (
        <Item key={uid()} product={product} />
      ))}
    </ul>
  );
});

export default ItemList;