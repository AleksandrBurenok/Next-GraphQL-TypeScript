import { useIntl } from 'react-intl';

import { regions } from 'constants/regions';

import styles from './styles.module.scss';

const Regions = () => {
  const { messages } = useIntl();

  return (
    <ul className={styles.listsMenu}>
      {regions(messages).map(({ url, name, key }) => (
        <li key={key} className={styles.listMenu}>
          <a
            className={styles.linkMenu}
            href={url}
            aria-label={key}
            target="_blank"
            rel="noreferrer noopener"
          >
            {name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Regions;
