import { useState } from 'react';
import { useIntl } from 'react-intl';
import clsx from 'clsx';
import Image from 'next/image';

import { Item as ItemI } from 'interfaces/menu';

import ArrowDown from 'icons/ArrowDown';

import Link from 'components/Link';

import styles from './styles.module.scss';

interface Props {
  path: string;
  title: string;
  items: ItemI[];
  closeMenu: () => void;
  image: { image: { altText: string; mediaItemUrl: string } };
}

const SubMenu = ({ path, title, items, image, closeMenu }: Props) => {
  const { messages } = useIntl();

  const [isOpen, setIsOpen] = useState(false);

  return !!items.length ? (
    <div className={clsx(styles.submenuItem, isOpen && styles.open)}>
      <div className={styles.submenuTitle}>
        <Link className={styles.link} href={path}>
          <div className={styles.wrapperImage}>
            {image && image.image && (
              <div className={styles.image}>
                <Image
                  alt={image.image.altText || messages.imageAltPlaceholder}
                  src={image.image.mediaItemUrl}
                  width="24"
                  height="24"
                />
              </div>
            )}
            <span className={styles.menuLink}>{title}</span>
          </div>
        </Link>
        {!!items.length && (
          <button
            type="button"
            className={styles.buttonArrow}
            onClick={() => setIsOpen(!isOpen)}
          >
            <ArrowDown className={clsx(isOpen && styles.icon)} />
          </button>
        )}
      </div>
      <div className={styles.submenuContent}>
        {items.map(({ path, key, title, children, menu_item_fields }) => (
          <SubMenu
            path={path}
            key={key}
            title={title}
            items={children}
            closeMenu={closeMenu}
            image={menu_item_fields}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className={styles.submenuItem}>
      <div className={styles.submenuTitle}>
        <Link className={styles.link} href={path}>
          <div className={styles.wrapperImage}>
            {image && image.image && (
              <div className={styles.image}>
                <Image
                  alt={image.image.altText || messages.imageAltPlaceholder}
                  src={image.image.mediaItemUrl}
                  width="24"
                  height="24"
                />
              </div>
            )}
            <span className={styles.menuLink}>{title}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SubMenu;
