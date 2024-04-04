import { ReactNode, useState } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

interface Props {
  children?: ReactNode;
  content: string;
  direction: string;
}

const Tooltip = ({ children, content, direction }: Props) => {
  const [active, setActive] = useState(false);

  const showTip = () => {
    setActive(true);
  };

  const hideTip = () => {
    setActive(false);
  };

  return (
    <div className={styles.root} onMouseEnter={showTip} onMouseLeave={hideTip}>
      {children}
      {active && (
        <div className={clsx(styles.tooltip, styles[direction])}>{content}</div>
      )}
    </div>
  );
};

export default Tooltip;
