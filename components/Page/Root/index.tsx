import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface Props {
  children: ReactNode;
}

const Root = ({ children }: Props) => {
  return <div className={styles.root}>{children}</div>;
};

export default Root;
