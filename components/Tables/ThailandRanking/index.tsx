import { League as LeagueI } from 'interfaces/league';

import Form from 'forms/Tables/ThailandRanking';

interface Props {
  priorityLeagues: LeagueI[];
  isMobile?: boolean;
}

const ThailandRanking = (props: Props) => {
  return <Form {...props} />;
};

export default ThailandRanking;
