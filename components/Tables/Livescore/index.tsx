import { League as LeagueI } from 'interfaces/league';
import { Post as PostI } from 'interfaces/post';

import Form from 'forms/Tables/Livescore';

import styles from './styles.module.scss';

interface Props {
  priorityLeagues: LeagueI[];
  countries: { node: PostI }[];
  isMobile?: boolean;
  isCountries?: boolean;
}

const Livescore = (props: Props) => {
  return (
    <div className={styles.root}>
      <Form {...props} />
    </div>
  );
};

export default Livescore;
