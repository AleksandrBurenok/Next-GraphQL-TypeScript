import { ReactNode } from 'react';
import clsx from 'clsx';

import { Styles } from 'interfaces/props';

import styles from './styles.module.scss';

interface Props extends Styles {
  children: ReactNode;
}

const Sidebar = ({ children, className }: Props) => {
  return <div className={clsx(styles.sidebar, className)}>{children}</div>;
};

export default Sidebar;
