import { ReactNode } from 'react';
import clsx from 'clsx';

import { Styles } from 'interfaces/props';

import styles from './styles.module.scss';

interface Props extends Styles {
  children: ReactNode;
}

const Grid = ({ children, className }: Props) => {
  return <div className={clsx(styles.grid, className)}>{children}</div>;
};

export default Grid;
