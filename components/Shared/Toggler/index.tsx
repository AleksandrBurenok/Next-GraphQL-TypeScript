import { ReactNode, useState } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

interface Props {
  header: ReactNode;
  children: ReactNode;
}

const Toggler = ({ header, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.root}>
      <div
        className={clsx(styles.toggler, isOpen && styles.active)}
        onClick={toggleOpen}
      >
        {header}
      </div>

      {isOpen && <div className={styles.wrapper}>{children}</div>}
    </div>
  );
};

export default Toggler;
