import axios from "axios";
import * as React from 'react';
import {useEffect, useState} from "react";
import {BASE_API_URL} from "config/urls.ts";
import Text from "../../components/Text";
// import styles from "./CategoriesPage.module.scss";

export interface ICategory {
  id: number;
  name: string;
  image: string;
}

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    axios.get(`${BASE_API_URL}/categories`)
      .then((response): void => {
        setCategories(response.data);
      });
  }, [])

  return (
    <div>
      {categories.map((category: ICategory) => (
        <Text key={category.id} tag="div" view="p-20" weight="normal">{category.name}</Text>
      ))}
    </div>
  );
};

export default CategoriesPage;