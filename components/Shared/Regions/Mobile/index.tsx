import { useState, useRef } from 'react';
import { useIntl } from 'react-intl';
import clsx from 'clsx';

import { regions } from 'constants/regions';

import ArrowDown from 'icons/ArrowDown';

import { Styles } from 'interfaces/props';

import { useOnClickOutside } from 'hooks';

import Button from 'components/Shared/Button';

import styles from './styles.module.scss';

const Regions = ({ className }: Styles) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);

  const { messages } = useIntl();

  const toggleRegions = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdownRegions = () => {
    setIsOpen(false);
  };

  useOnClickOutside(ref, closeDropdownRegions);

  return (
    <ul className={styles.root}>
      <li>
        <Button type="button" onClick={toggleRegions} className={styles.btn}>
          TH
          <ArrowDown className={clsx(styles.arrow, isOpen && styles.rotate)} />
        </Button>
        <ul
          ref={ref}
          className={clsx(styles.dropdown, className, isOpen && styles.active)}
        >
          {isOpen &&
            regions(messages).map(({ url, key }) => (
              <li key={key} className={styles.listMenu}>
                <a
                  className={styles.linkMenu}
                  href={url}
                  aria-label={key}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {key}
                </a>
              </li>
            ))}
        </ul>
      </li>
    </ul>
  );
};

export default Regions;
