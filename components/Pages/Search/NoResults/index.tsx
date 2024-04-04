import { Sections } from 'enums/path';

import { Messages } from 'interfaces/intl';

import Link from 'components/Link';

import styles from './styles.module.scss';

interface Props {
  messages: Messages;
  searchQuery: string;
}

export const NoResults = ({ messages, searchQuery }: Props) => {
  return (
    <div className={styles.noResults}>
      <p className={styles.title}>
        {messages.unfortunatelyThereNoResults} “{searchQuery}”
      </p>
      <p>{messages.tryPopularSearches}:</p>
      <div>
        <Link href={`/${Sections.livescore}/`}>
          <span className={styles.link}>{messages.livescore},</span>
        </Link>
        <Link href={`/${Sections.footballNews}/`}>
          <span className={styles.link}>{messages.footballNews},</span>
        </Link>
        <Link href={`/${Sections.footballHighlights}/`}>
          <span className={styles.link}>{messages.highlights}</span>
        </Link>
      </div>
    </div>
  );
};

export default NoResults;
