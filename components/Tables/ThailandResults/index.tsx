import { League as LeagueI } from 'interfaces/league';

import Form from 'forms/Tables/ThailandResults';

import styles from './styles.module.scss';

interface Props {
  priorityLeagues: LeagueI[];
  isMobile?: boolean;
}

const ThailandResults = (props: Props) => {
  return (
    <div className={styles.root}>
      <Form {...props} />
    </div>
  );
};

export default ThailandResults;
