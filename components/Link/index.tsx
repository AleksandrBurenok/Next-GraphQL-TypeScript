import { ReactNode } from 'react';
import NextLink from 'next/link';

import { Styles } from 'interfaces/props';

interface Props extends Styles {
  children: ReactNode;
  href: string;
  passHref?: boolean;
  ariaLabel?: string;
}

const Link = ({
  children,
  href,
  passHref = false,
  ariaLabel,
  className,
  ...restProps
}: Props) => {
  return (
    <NextLink href={href} passHref={passHref} {...restProps}>
      <a className={className} href={href} aria-label={ariaLabel}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
