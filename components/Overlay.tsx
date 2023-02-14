import { ReactNode } from 'react';

import styles from './Overlay.module.css';

type Props = {
  children: ReactNode;
};

function Overlay({ children }: Props) {
  return <div className={styles.overlay}>{children}</div>;
}

export default Overlay;
