import axios from "axios";
import {debounce} from 'lodash';
import {observer} from 'mobx-react-lite';
import {useEffect, useState} from "react";
import * as React from "react";
import Button from "components/Button";
import Input from "components/Input";
import MultiDropdown, {Option} from "components/MultiDropdown";
import Text from "components/Text";
import {IProduct} from "store/ItemStore.ts";
import ItemList from "./components/ItemList";
import styles from "./ListProductsPage.module.scss";

const ListProductsPage: React.FC = observer(() => {
  const [searchText, setSearchText] = useState<string>("");
  const [allItemsLoaded, setAllItemsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<IProduct[]>([]);
  const [currentOffset, setCurrentOffset] = useState<number>(0);
  const [fetching, setFetching] = useState<boolean>(true);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const scrollHandler = debounce((): void => {
    const target: HTMLElement = document.documentElement;
    if (!allItemsLoaded && target.scrollHeight - (target.scrollTop + window.innerHeight) < 100) {
      setFetching(true);
    }
  }, 200);
  const handleInputChange = (text: string): void => {
    setSearchText(text);
    setIsDirty(true);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };
  const handleSearchClick = (): void => {
    setIsDirty(false);
    setCurrentOffset(0);
    setItems([]);
    setAllItemsLoaded(false);
    setFetching(true);
  };

  useEffect((): void => {
    if (fetching) {
      axios.get(`https://api.escuelajs.co/api/v1/products?${searchText ? `title=${searchText}&` : ''}limit=3&offset=${currentOffset}`)
        .then((response): void => {
          if (response.data.length === 0) {
            setAllItemsLoaded(true);
          } else {
            setItems((prevItems: IProduct[]) => [...prevItems, ...response.data]);
            setCurrentOffset((prevState: number) => prevState + 3);
          }
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect((): () => void => {
    document.addEventListener('scroll', scrollHandler);

    return function (): void {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);

  return (
    <div className={styles.main}>
      <div className={styles.mainContainer}>
        <div className={styles.hero}>
          <div className={styles.heroTitle}>
            <Text tag="h1" color="primary" weight="bold">Products</Text>
          </div>
          <div className={styles.heroDescription}>
            <Text tag="div" view="p-20" color="secondary" weight="normal">We display products based on the latest
              products we have, if you want to see our old products please enter the name of the item</Text>
          </div>
        </div>
        <div className={styles.features}>
          <div className={styles.searcher}>
            <Input
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              value={searchText}
              placeholder="Search product"
            />
            <Button onClick={handleSearchClick} disabled={!isDirty}>
              <Text tag="div" view="button" weight="normal" maxLines={1}>Find now</Text>
            </Button>
          </div>
          <div className={styles.filter}>
            <MultiDropdown
              getTitle={(opts: Option[]) => {
                const strOpts: string[] = [];
                opts.map((opt: Option) => strOpts.push(opt.value))
                return strOpts.join(", ")
              }}
              onChange={(): void => {
              }}
              options={[{key: "t1", value: "test1"}, {key: "t2", value: "test2"}, {key: "t3", value: "test3"}]}
              value={[{key: "t2", value: "test2"}, {key: "t3", value: "test3"}]}
            />
          </div>
        </div>
        <div className={styles.products}>
          <div className={styles.productsTotal}>
            <Text tag="div" view="title" weight="bold" color="primary">Total Product</Text>
            <Text tag="div" view="p-20" weight="bold" color="accent">{10000000}</Text>
          </div>
          <div className={styles.productsList}>
            <ItemList items={items}/>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ListProductsPage;