import { TablePageTemplate as TablePageTemplateI } from 'interfaces/pageTemplates/table';
import { League as LeagueI } from 'interfaces/league';
import { PageBanners as PageBannersI } from 'interfaces/banners';
import { Post as PostI } from 'interfaces/post';

import { SITE_URL } from 'constants/env';

import { Sections } from 'enums/path';

type NodePost = { node: PostI };

export interface Props {
  page: TablePageTemplateI;
  leagues: NodePost[];
  priorityLeagues: LeagueI[];
  banners: PageBannersI;
  isLeagues: boolean;
}

export const getLeaguesRanking = (leagues: NodePost[], league: string) => {
  return leagues.find((entity) => entity.node.slug === league) as {
    node: PostI;
  };
};

export const getSocialUrl = (
  leaguesRanking: NodePost,
  isLeagues: boolean,
  slug: string
) =>
  isLeagues && leaguesRanking
    ? `${SITE_URL}/${Sections.football}/${Sections.thailandRanking}/${leaguesRanking.node.slug}`
    : `${SITE_URL}/${Sections.football}/${slug}`;
