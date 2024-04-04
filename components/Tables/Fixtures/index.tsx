import { League as LeagueI } from 'interfaces/league';

import Form from 'forms/Tables/Fixtures';

import styles from './styles.module.scss';

interface Props {
  priorityLeagues: LeagueI[];
  isMobile?: boolean;
  title: string;
}

const Fixtures = (props: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Form {...props} />
      </div>
    </div>
  );
};

export default Fixtures;
