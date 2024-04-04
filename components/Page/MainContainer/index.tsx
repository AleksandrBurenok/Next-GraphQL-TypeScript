import { ReactNode } from 'react';
import clsx from 'clsx';

import { Styles } from 'interfaces/props';

import styles from './styles.module.scss';

interface Props extends Styles {
  children: ReactNode;
}

const MainContainer = ({ children, className }: Props) => {
  return (
    <div className={clsx(styles.mainContainer, className)}>{children}</div>
  );
};

export default MainContainer;
