import axios from "axios";
import { debounce } from 'lodash';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from "react";
import * as React from "react";
import Text from "components/Text";
import { fetchItems } from "http/itemApi";
import Button from "../../components/Button";
import Input from "../../components/Input";
import MultiDropdown from "../../components/MultiDropdown";
// import { Context, IAppContext } from '../../main.tsx';
import { IProduct } from "../../store/ItemStore.ts";
import ItemList from "./components/ItemList";
import styles from  "./ListProductsPage.module.scss";

const ListProductsPage: React.FC = observer(() => {
  // const { item } = useContext(Context) as IAppContext;
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [items, setItems] = useState<IProduct[]>([]);
  const [total, setTotal] = useState<number>(1);
  const [currentOffset, setCurrentOffset] = useState<number>(0);
  const [fetching, setFetching] = useState<boolean>(true);
  const [hasFetchedItems, setHasFetchedItems] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<IProduct[]>([]);
  const scrollHandler = debounce((): void => {
    const target: HTMLElement = document.documentElement;
    if (target.scrollHeight - (target.scrollTop + window.innerHeight) < 100) {
      setFetching(true);
    }
  }, 200);
  const handleInputChange = (text: string): void => {
    setSearchText(text);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };
  const handleSearchClick = (): void => {
    axios.get("https://api.escuelajs.co/api/v1/products")
      .then((response): void => {
        const filteredProducts = response.data.filter((product: IProduct) => {
          return product.title.toLowerCase().includes(searchText.toLowerCase());
        });
        setFilteredItems(filteredProducts.length > 0 ? filteredProducts : searchText === "" ? items : []);
        setButtonClicked(true);
      })
      .catch((error): void => {
        throw new Error(`Error fetching products: ${error}`);
      });
  };

  useEffect((): void => {
    setTotal(filteredItems.length);
  }, [filteredItems]);

  useEffect((): void => {
    if (fetching) {
      if (items.length < total) {
        axios.get(`https://api.escuelajs.co/api/v1/products?limit=3&offset=${currentOffset}`)
          .then((response): void => {
            setItems((prevItems: IProduct[]) => [...prevItems, ...response.data]);
            setCurrentOffset((prevState: number) => prevState + 3);
            if (!hasFetchedItems) {
              fetchItems().then(data => {
                // item.setItems(data);
                setTotal(data.length);
                setHasFetchedItems(true);
              });
            }
          })
          .finally(() => setFetching(false));
      } else {
        setFetching(false);
      }
    }
  }, [fetching, hasFetchedItems]);

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
            <Text tag="div" view="p-20" color="secondary" weight="normal">We display products based on the latest products we have, if you want to see our old products please enter the name of the item</Text>
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
            <Button onClick={handleSearchClick}>
              <Text tag="div" view="button" weight="normal" maxLines={1}>Find now</Text>
            </Button>
          </div>
          <div className={styles.filter}>
            <MultiDropdown
              getTitle={(opts) => {
                const strOpts: string[] = [];
                opts.map((opt) => strOpts.push(opt.value))
                return strOpts.join(", ")
              }}
              onChange={(): void => {}}
              options={[{key: "t1", value: "test1"}, {key: "t2", value: "test2"}, {key: "t3", value: "test3"}]}
              value={[{key: "t2", value: "test2"}, {key: "t3", value: "test3"}]}
            />
          </div>
        </div>
        <div className={styles.products}>
          <div className={styles.productsTotal}>
            <Text tag="div" view="title" weight="bold" color="primary">Total Product</Text>
            <Text tag="div" view="p-20" weight="bold" color="accent">{total}</Text>
          </div>
          <div className={styles.productsList}>
            <ItemList items={buttonClicked ? filteredItems : items} />
          </div>
        </div>
        {/*<div className={styles.pagination}>*/}
        {/*    1234...*/}
        {/*</div>*/}
      </div>
    </div>
  );
});

export default ListProductsPage;