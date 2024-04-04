import { League as LeagueI } from 'interfaces/league';

import Form from 'forms/Tables/Results';

import styles from './styles.module.scss';

interface Props {
  priorityLeagues: LeagueI[];
  isMobile?: boolean;
}

const Results = (props: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Form {...props} />
      </div>
    </div>
  );
};

export default Results;
