import axios from "axios";
import {makeAutoObservable} from 'mobx';
import {BASE_API_URL} from "config/urls.ts";

export interface ICategory {
  creationAt: string;
  id: number;
  image: string;
  name: string;
  updatedAt: string;
}

export default class CategoryStore {
  private _items: ICategory[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setItems(categories: ICategory[]): void {
    this._items = categories;
  }

  async fetchCategories(): Promise<void> {

    if (this._items.length > 0) {
      return;
    }
    try {
      const response = await axios.get<ICategory[]>(`${BASE_API_URL}/categories`);

      this._items = response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Если есть сетевой ответ с ошибкой
          throw new Error(`Error category: ${error.message}. Status: ${error.response.status}`);
        } else {
          // Если нет сетевого ответа
          throw new Error(`Error category: ${error.message}`);
        }
      } else {
        // Другие виды ошибок
        throw error;
      }
    }
  }

  get items(): ICategory[] {
    return this._items;
  }
}
