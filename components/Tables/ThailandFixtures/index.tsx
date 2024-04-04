import { League as LeagueI } from 'interfaces/league';

import Form from 'forms/Tables/ThailandFixtures';

interface Props {
  priorityLeagues: LeagueI[];
  isMobile?: boolean;
  title: string;
}

const ThailandFixtures = (props: Props) => {
  return <Form {...props} />;
};

export default ThailandFixtures;
