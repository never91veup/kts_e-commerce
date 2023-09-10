import * as React from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import { uid } from 'uid';
import Text from "../Text";
import BagIcon from "../icons/BagIcon";
import stl from "../icons/Icon/Icon.module.scss";
import LalasiaIcon from "../icons/LalasiaIcon";
import LogoIcon from "../icons/LogoIcon";
import UserIcon from "../icons/UserIcon";
import styles from  "./Header.module.scss";

const Header: React.FC = () => {
  const NavHeaders: string[] = ["Products", "Categories", "About us"];
  const location = useLocation();

  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.left}>
          <LogoIcon width="42" height="42" />
          <LalasiaIcon width="77" height="20" />
        </div>
        <div className={styles.center}>
          <ul className={styles.headerList}>
            {NavHeaders.map((item: string) => (
              <NavLink
                className={`${styles.headerListItem} ${location.pathname === `/${item.toLowerCase().split(" ").join("-")}` ? styles.active : ''}`}
                key={uid()}
                to={`/${item.toLowerCase().split(" ").join("-")}`}
              >
                <Text tag='div' weight="medium" view="p-18" maxLines={1}>{item}</Text>
              </NavLink>
            ))}
          </ul>
        </div>
        <div className={styles.right}>
          <BagIcon className={stl.cp} width="30" height="30" />
          <UserIcon className={stl.cp} width="30" height="30" />
        </div>
      </div>
    </div>
  );
};

export default Header;