import * as React from 'react';
import styles from './Loader.module.scss';

export type LoaderProps = {
    /** Размер */
    size?: 's' | 'm' | 'l';
    /** Дополнительный класс */
    className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size, className}) => {
    const loaderSizeClass: string = styles[`loader_${size}`];

    const loaderClass: string = `${styles.bcBrand} ${styles.loader} ${loaderSizeClass} ${className ? className : ''}`.trim();

    return (
        <div className={loaderClass}>
            <div className={styles.loaderInner}></div>
        </div>
    );
};

export default Loader;
