import * as React from 'react';
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
                            <li key={uid()} className={styles.headerListItem}>
                                <Text tag='div' weight="medium" view="p-18" maxLines={1}>{item}</Text>
                            </li>
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