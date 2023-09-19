import * as React from "react";
import * as ReactDOM from 'react-dom/client';
import CategoryStore from "store/CategoryStore";
import ItemStore from 'store/ItemStore';
import App from './App.tsx';
import "config/configureMobX.ts"
import 'styles/styles.scss';

export interface IAppContext {
  item: ItemStore;
  category: CategoryStore;
}

export const Context: React.Context<IAppContext | null> = React.createContext<IAppContext |null>(null);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Context.Provider
    value={{
      item: new ItemStore(),
      category: new CategoryStore(),
    }}
  >
    <App/>
  </Context.Provider>
  // </React.StrictMode>,
)
