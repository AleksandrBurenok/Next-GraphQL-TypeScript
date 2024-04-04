import { Groups, Stages } from 'enums/prediction';

import { Seo } from './seo';

export interface Team {
  name: string;
  place: number;
  icon: string;
  id: number;
  team: number;
}

export interface Group {
  teams: Team[];
  group_name: Groups;
}

export interface Stage {
  stage: Stages;
  stage_name: string;
  finished: string;
  groups: Group[];
}

export interface StageInfo {
  date_from: string;
  date_to: string;
  label: string;
}

export interface Championship {
  title: string;
  content: string;
  advanced_text: string;
  featuredImage: string;
  title_table: string;
  seo: Seo;
  slug: string;
  stages: Stage[];
  stages_info: StageInfo[];
}

export interface Bets {
  ref: string;
}

export type SelectedTeams = {
  [key in Stages]: {
    [key in Groups]: Team[];
  };
};

export type SelectedValues = {
  [key in Groups]: Team[];
};

export interface StageWinnersImage {
  altText: string;
  guid: string;
  mediaDetails: {
    height: number;
    width: number;
  };
}

export interface StageWinners {
  fieldGroupName: string;
  stageName: string;
  winnerName: string;
  prizeName: string;
  rewardImage: StageWinnersImage;
  rewardGalleryImage: StageWinnersImage[];
}

export interface ChampionshipWinners {
  slug: string;
  title: string;
  content: string;
  seo: Seo;
  championship_winners: {
    stages: StageWinners[];
  };
}
export interface GetBets {
  ref: string;
  user: string;
}
