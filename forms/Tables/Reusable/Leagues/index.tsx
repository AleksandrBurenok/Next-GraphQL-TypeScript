import { Sections } from 'enums/path';

import { SelectList } from 'types/selectList';

import styles from './styles.module.scss';

interface Props {
  section: Sections;
  list: SelectList;
  isLivescore?: boolean;
}

const Leagues = ({ section, list, isLivescore }: Props) => {
  return (
    <ul className={styles.leaguesList}>
      {list.slice(1).map(({ name, value }) => (
        <li key={value} className={styles.league}>
          <a
            className={styles.leagueLink}
            href={
              isLivescore
                ? `/${section}/${value}/`
                : `/${Sections.football}/${section}/${value}/`
            }
          >
            {name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Leagues;
