import { League as LeagueI } from 'interfaces/league';

import Form from 'forms/Tables/Ranking';

interface Props {
  priorityLeagues: LeagueI[];
  isMobile?: boolean;
}

const Ranking = (props: Props) => {
  return <Form {...props} />;
};

export default Ranking;
