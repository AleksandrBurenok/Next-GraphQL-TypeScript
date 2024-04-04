import { League as LeagueI } from './league';
import { Fixture as FixtureI } from './fixture';

export interface Livescore {
  id: number;
  league: LeagueI;
  fixtures: FixtureI[];
}
