import axios from "axios";
import {debounce} from 'lodash';
import {observer} from 'mobx-react-lite';
import * as React from "react";
import Button from "components/Button";
import Dropdown from "components/Dropdown";
import Input from "components/Input";
import {Option} from "components/MultiDropdown";
import Text from "components/Text";
import {BASE_API_URL} from "config/urls.ts";
import {ICategory} from "pages/categories/CategoriesPage.tsx";
import {Context, IAppContext} from "../../main.tsx";
import ItemList from "./components/ItemList";
import styles from "./ListProductsPage.module.scss";

const currentLimit: number = 3;

const ListProductsPage: React.FC = observer(() => {
  const store = React.useContext<IAppContext | null>(Context);
  const [value, setValue] = React.useState<string>("");
  const [prevCategoryId, setPrevCategoryId] = React.useState<string | null>(null);
  const [categoryId, setCategoryId] = React.useState<string>("");
  const [searchText, setSearchText] = React.useState<string>("");
  const [allItemsLoaded, setAllItemsLoaded] = React.useState<boolean>(false);
  const [fetching, setFetching] = React.useState<boolean>(true);
  const [isDirty, setIsDirty] = React.useState<boolean>(false);

  const clearFilter = (): void => {
    setValue("");
    setCategoryId("");
    handleSearchClick();
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
    store?.item.setItems([]);
    setAllItemsLoaded(false);
    setFetching(true);
  };

  React.useEffect(() => {
    const params: URLSearchParams = new URLSearchParams();
    if (searchText) params.append('title', searchText);
    if (categoryId) params.append('categoryId', categoryId);
    if (currentLimit) params.append('limit', String(currentLimit));
    if (store?.item.items.length) params.append('offset', String(store?.item.items.length - currentLimit));

    // Заменяем текущий URL обновленным
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  }, [searchText, categoryId, store?.item.items.length]);

  React.useEffect((): void => {
    store?.category.fetchCategories();
  }, [store?.category]);

  React.useEffect((): void => {
    if (fetching) {
      axios.get(`${BASE_API_URL}/products?${searchText ? `title=${searchText}&` : ''}${categoryId ? `categoryId=${categoryId}&` : ''}limit=${currentLimit}&offset=${store?.item.items.length}`)
        .then((response): void => {
          if (response.data.length === 0) {
            setAllItemsLoaded(true);
          } else {
            store?.item.setItems([...store.item.items, ...response.data]);
          }
        })
        .finally((): void => {
          setFetching(false);
          setPrevCategoryId(categoryId);
        });
    }
  }, [fetching, categoryId, searchText, store?.item]);

  React.useEffect((): () => void => {
    document.addEventListener('scroll', scrollHandler);

    return function (): void {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);

  const handleCategorySelect = (selectedCategory: string): void => {
    setValue(selectedCategory);
    const selectedOption: ICategory | undefined = store?.category.items.find(category => category.name === selectedCategory);
    if (selectedOption) {
      const newCategoryId: string = selectedOption.id.toString();
      if (newCategoryId !== prevCategoryId) {
        setCategoryId(newCategoryId);
        setPrevCategoryId(newCategoryId);
        handleSearchClick();
      }
    }
  };
  const selectedValue: Option | undefined = store?.category.items.map(category => ({
    key: category.id.toString(),
    value: category.name
  })).find((item: Option): boolean => item.value === value);

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
            <Dropdown
              selected={selectedValue || null}
              options={store !== null ? store.category.items.map(category => ({
                key: category.id.toString(),
                value: category.name
              })) : []}
              onChange={(selectedValue: string): void => {
                handleCategorySelect(selectedValue);
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
            <ItemList items={store !== null ? store.item.items : []}/>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ListProductsPage;