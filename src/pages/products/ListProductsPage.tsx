import axios from "axios";
import {debounce} from 'lodash';
import {observer} from 'mobx-react-lite';
import {useEffect, useState} from "react";
import * as React from "react";
import Button from "components/Button";
import Input from "components/Input";
// import MultiDropdown, {Option} from "components/MultiDropdown";
import Text from "components/Text";
import {IProduct} from "store/ItemStore.ts";
import Dropdown from "../../components/Dropdown";
import {BASE_API_URL} from "../../config/urls.ts";
import {ICategory} from "../categories/CategoriesPage.tsx";
import ItemList from "./components/ItemList";
import styles from "./ListProductsPage.module.scss";

const currentLimit: number = 3;

const ListProductsPage: React.FC = observer(() => {
  const [value, setValue] = useState<string>("");
  const [prevCategoryId, setPrevCategoryId] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [allItemsLoaded, setAllItemsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<IProduct[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const clearFilter = (): void => {
    setValue("");
    setCategoryId("");
    setIsDirty(false);
    setItems([]);
    setAllItemsLoaded(false);
    setFetching(true);
  };
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
    setItems([]);
    setAllItemsLoaded(false);
    setFetching(true);
  };

  useEffect((): void => {
    axios.get(`${BASE_API_URL}/categories`)
      .then((response): void => {
        setCategories(response.data);
      });
  }, [])

  useEffect((): void => {
    if (fetching) {
      axios.get(`${BASE_API_URL}/products?${searchText ? `title=${searchText}&` : ''}${categoryId ? `categoryId=${categoryId}&` : ''}limit=${currentLimit}&offset=${items.length}`)
        .then((response): void => {
          if (response.data.length === 0) {
            setAllItemsLoaded(true);
          } else {
            setItems((prevItems: IProduct[]) => [...prevItems, ...response.data]);
          }
        })
        .finally(() => {
          setFetching(false);
          setPrevCategoryId(categoryId);
        });
    }
  }, [fetching, categoryId]);

  useEffect((): () => void => {
    document.addEventListener('scroll', scrollHandler);

    return function (): void {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);

  const handleValueSelect = (selectedValue: string): void => {
    setValue(selectedValue);
    const selectedOption: ICategory | undefined = categories.find(category => category.name === selectedValue);
    if (selectedOption) {
      const newCategoryId = selectedOption.id.toString();
      if (newCategoryId !== prevCategoryId) {
        setCategoryId(newCategoryId);
        setPrevCategoryId(newCategoryId);
        handleSearchClick();
      }
    }
  };
  const selectedValue = categories.map(category => ({
    key: category.id.toString(),
    value: category.name
  })).find((item): boolean => item.value === value);

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
            {/*<MultiDropdown*/}
            {/*  getTitle={(values: Option[]): string => values.length === 0 ? "Filter" : values.map(({value}) => value).join(', ')}*/}
            {/*  onChange={(data: Option[]) => {*/}
            {/*    setValue(data); //дорешать*/}
            {/*    setCategoryId(data[0].key);*/}
            {/*    handleSearchClick();*/}
            {/*  }}*/}
            {/*  options={categories.map(category => ({*/}
            {/*    key: category.id.toString(),*/}
            {/*    value: category.name*/}
            {/*  }))}*/}
            {/*  value={value}*/}
            {/*/>*/}
            <Dropdown
              selected={selectedValue || null}
              options={categories.map(category => ({
                key: category.id.toString(),
                value: category.name
              }))}
              onChange={(selectedValue: string): void => {
                handleValueSelect(selectedValue);
              }}
              placeholder="Filter"
            />
            <Button
              onClick={clearFilter}
              disabled={!value && !categoryId}
            >
              <Text tag="div" view="button" weight="normal" maxLines={1}>Clear Filter</Text>
            </Button>
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