import { ReactNode } from 'react';
import clsx from 'clsx';

import { Styles } from 'interfaces/props';

import styles from './styles.module.scss';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  active?: boolean;
  type?: 'submit' | 'reset' | 'button';
}

const Button = ({
  children,
  onClick,
  className,
  disabled,
  type,
  ...attrs
}: Props) => {
  const classes = clsx(styles.btn, className);

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...attrs}
    >
      {children}
    </button>
  );
};

export default Button;
