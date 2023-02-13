import { ReactNode } from 'react';
import styles from './Row.module.css';

type Props = {
  children: ReactNode;
};

function Row({ children }: Props) {
  return <div className={styles.row}>{children}</div>;
}

export default Row;
