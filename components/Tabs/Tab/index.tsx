import { ReactNode } from 'react';
import clsx from 'clsx';

import { Styles } from 'interfaces/props';

import styles from './styles.module.scss';

interface Props extends Styles {
  children: ReactNode;
  title?: string;
  isMenu?: boolean;
  href?: string;
  image?: string;
  finished?: boolean;
  dateFrom?: string;
  dateTo?: string;
  menuImage?: { image: { altText: string; mediaItemUrl: string } };
}

const Tab = ({ children, className }: Props) => {
  return <div className={clsx(styles.root, className)}>{children}</div>;
};

export default Tab;
