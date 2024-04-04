import { Team as TeamI } from './team';
import { Scores as ScoresI } from './scores';
import { Card as CardI } from './card';

export interface Fixture {
  id: number;
  time: string;
  status: string;
  localTeam: TeamI;
  visitorTeam: TeamI;
  scores: ScoresI;
  hasH2H: boolean;
  timer: {
    minute: string;
    second: string;
  };
  events: CardI[];
}

export interface H2h {
  localTeam: TeamI;
  visitorTeam: TeamI;
  data: {
    stats: {
      localteam: {
        goals: number;
        all: number;
        win: number;
        draw: number;
        lose: number;
        id: string;
      };
      visitorteam: {
        goals: number;
        all: number;
        win: number;
        draw: number;
        lose: number;
        id: string;
      };
    };
  };
}
