import {observer} from "mobx-react-lite";
import * as React from 'react';
import {useContext} from "react";
import Text from "components/Text";
import {Context, IAppContext} from "../../main.tsx";
// import styles from "./CategoriesPage.module.scss";

export interface ICategory {
  id: number;
  name: string;
  image: string;
}

const CategoriesPage: React.FC = observer(() => {
  const store = useContext<IAppContext | null>(Context);

  React.useEffect(() => {
    store?.category.fetchCategories();
  }, [store?.category]);

  return (
    <div>
      {store?.category.items.map((category: ICategory) => (
        <Text key={category.id} tag="div" view="p-20" weight="normal">{category.name}</Text>
      ))}
    </div>
  );
});

export default CategoriesPage;