import * as React from "react";
import * as ReactDOM from 'react-dom/client';
import ItemStore from 'store/ItemStore';
import App from './App.tsx';
import 'styles/styles.scss';

export interface IAppContext {
  item: ItemStore;
}

export const Context: React.Context<IAppContext | undefined> = React.createContext<IAppContext | undefined>(undefined);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Context.Provider
    value={{
      item: new ItemStore(),
    }}
  >
    <App/>
  </Context.Provider>
  // </React.StrictMode>,
)
