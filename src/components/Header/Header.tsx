import * as React from 'react';
import {Link, useLocation} from 'react-router-dom';
import Text from "components/Text";
import BagIcon from "components/icons/BagIcon";
import stl from "components/icons/Icon/Icon.module.scss";
import LalasiaIcon from "components/icons/LalasiaIcon";
import LogoIcon from "components/icons/LogoIcon";
import UserIcon from "components/icons/UserIcon";
import styles from "./Header.module.scss";

export interface IHeaders {
  title: string;
  link: string;
}

const headers: IHeaders[] = [
  {title: "Products", link: "/products"},
  {title: "Categories", link: "/categories"},
  {title: "About us", link: "/about-us"}
];

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <Link to="/products" className={styles.left}>
          <LogoIcon width="42" height="42"/>
          <LalasiaIcon width="77" height="20"/>
        </Link>
        <div className={styles.center}>
          <ul className={styles.headerList}>
            {headers.map((item: IHeaders) => (
              <Link
                className={`${styles.headerListItem} ${location.pathname === item.link ? styles.active : ''}`}
                key={item.title}
                to={item.link}
              >
                <Text tag='div' weight="medium" view="p-18" maxLines={1}>{item.title}</Text>
              </Link>
            ))}
          </ul>
        </div>
        <div className={styles.right}>
          <BagIcon className={stl.cp} width="30" height="30"/>
          <UserIcon className={stl.cp} width="30" height="30"/>
        </div>
      </div>
    </div>
  );
};

export default Header;