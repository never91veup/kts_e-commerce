import {makeAutoObservable} from 'mobx';
import {ICategory} from "./CategoryStore.ts";

export interface IProduct {
  id: number;
  category: ICategory;
  description: string;
  images: string[];
  price: number;
  title: string;
  creationAt: string;
  updatedAt: string;
}

export default class ItemStore {
  private _items: IProduct[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setItems(products: IProduct[]): void {
    this._items = products;
  }

  get items(): IProduct[] {
    return this._items;
  }
}
