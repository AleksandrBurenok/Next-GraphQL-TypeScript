import { TablePageTemplate as TablePageTemplateI } from 'interfaces/pageTemplates/table';
import { League as LeagueI } from 'interfaces/league';
import { PageBanners as PageBannersI } from 'interfaces/banners';
import { Post as PostI } from 'interfaces/post';

import { SITE_URL } from 'constants/env';

import { Sections } from 'enums/path';

export type NodePost = { node: PostI };

export interface Props {
  page: TablePageTemplateI;
  leagues: NodePost[];
  leaguesThai: NodePost[];
  countries: NodePost[];
  priorityLeagues: LeagueI[];
  banners: PageBannersI;
  isLeagues: boolean;
  isCountries: boolean;
}

export const getLeaguesLivescore = (leagues: NodePost[], league: string) => {
  return leagues.find((entity) => entity.node.slug === league) as {
    node: PostI;
  };
};

export const getCountriesLivescore = (
  countries: NodePost[],
  league: string
) => {
  return countries.find((entity) => entity.node.slug === league) as {
    node: PostI;
  };
};

export const getSocialUrl = (
  leaguesLivescore: NodePost,
  isLeagues: boolean,
  isCountries: boolean,
  countriesLivescore: NodePost,
  slug: string
) =>
  isLeagues && leaguesLivescore
    ? `${SITE_URL}/${Sections.livescore}/${leaguesLivescore.node.slug}`
    : isCountries && countriesLivescore
    ? `${SITE_URL}/${Sections.livescore}/${countriesLivescore.node.slug}`
    : `${SITE_URL}/${slug}`;

export const getFilteredLeaguesLivescore = (
  leagues: NodePost[],
  tables: string[]
) => {
  return leagues.filter((entity) => tables.includes(entity.node.slug));
};
