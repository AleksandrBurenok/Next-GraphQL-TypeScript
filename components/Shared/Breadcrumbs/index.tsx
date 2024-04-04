import clsx from 'clsx';
import { useIntl } from 'react-intl';

import { paths } from 'constants/paths';

import Breadcrumb from 'icons/Breadcrumb';

import styles from './styles.module.scss';

interface Props {
  slug: string;
  parentTitle: string;
  title: string;
}

const Breadcrumbs = ({ slug, parentTitle, title }: Props) => {
  const { messages } = useIntl();

  return (
    <div
      className={clsx(
        styles.breadcrumbs,
        paths.includes(`${slug}`) && !parentTitle && styles.breadcrumbsTop
      )}
    >
      <div className={styles.wrapper}>
        <a aria-label={messages.home} href={'/'}>
          <Breadcrumb className={styles.icon} />
        </a>
        <span className={styles.divider} />
        {parentTitle && (
          <>
            <a href={slug}>
              <span className={styles.parentTitle}>{parentTitle}</span>
            </a>
            <span className={styles.divider} />
          </>
        )}
        <span className={styles.title}>{title}</span>
      </div>
    </div>
  );
};

export default Breadcrumbs;
