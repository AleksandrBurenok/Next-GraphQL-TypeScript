import { useIntl } from 'react-intl';

import { Sections } from 'enums/path';

import Ball from 'icons/Ball';
import TableIcon from 'icons/TableIcon';

import Link from 'components/Link';

import styles from './styles.module.scss';

const QuickLinks = () => {
  const { messages } = useIntl();

  return (
    <div className={styles.root}>
      <Link href={`${Sections.livescore}`}>
        <div className={styles.wrapper}>
          <Ball className={styles.iconBall} />
          <span>{messages.livescore}</span>
        </div>
      </Link>
      <Link href={`${Sections.football}/${Sections.results}`}>
        <div className={styles.wrapper}>
          <TableIcon className={styles.iconTable} />
          <span>{messages.footballResults}</span>
        </div>
      </Link>
    </div>
  );
};

export default QuickLinks;
