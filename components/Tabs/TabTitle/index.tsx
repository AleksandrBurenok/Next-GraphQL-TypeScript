import { ReactNode } from 'react';
import clsx from 'clsx';
import { useIntl } from 'react-intl';
import Image from 'next/image';

import { Styles } from 'interfaces/props';

import styles from './styles.module.scss';

interface Props extends Styles {
  index: number;
  setSelectedTab: (index: number) => void;
  children?: ReactNode;
  active: boolean;
  isPrediction?: boolean;
  item: {
    props: {
      isMenu?: boolean;
      href?: string;
      title?: string;
      finished?: string;
      dateFrom?: string;
      dateTo?: string;
      menuImage?: { image: { altText: string; mediaItemUrl: string } };
    };
  };
}

const TabTitle = ({
  setSelectedTab,
  index,
  children,
  active,
  isPrediction = false,
  item,
}: Props) => {
  const { messages } = useIntl();

  const { isMenu, href, title, finished, dateFrom, dateTo, menuImage } =
    item.props;

  return (
    <li
      className={clsx(
        styles.tabTitle,
        isMenu && styles.tabTitleMenu,
        isPrediction && styles.tabsPredition
      )}
    >
      {!isMenu ? (
        <button
          className={clsx(
            styles.button,
            active && styles.active,
            active && isPrediction && styles.activePrediction,
            isPrediction && !finished && styles.noActivePrediction
          )}
          onClick={() => setSelectedTab(index)}
          type="button"
        >
          {title && <span>{title}</span>}
          {(dateFrom || dateTo) && (
            <div className={styles.wrapperDate}>
              <span>{dateFrom}</span>
              <span className={styles.dateSeparator}>{messages.to}</span>
              <span>{dateTo}</span>
            </div>
          )}
          {children}
        </button>
      ) : (
        <a
          className={styles.link}
          onMouseOver={() => setSelectedTab(index)}
          href={href}
        >
          <div className={styles.wrapper}>
            {menuImage!.image && (
              <Image
                alt={menuImage!.image.altText}
                src={menuImage!.image.mediaItemUrl}
                width="24"
                height="24"
              />
            )}
            {title && <span className={styles.linkText}>{title}</span>}
            {children}
          </div>
        </a>
      )}
    </li>
  );
};

export default TabTitle;
