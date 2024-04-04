import { PageMenu as PageMenuI } from 'interfaces/menu';
import { PageBanners as PageBannersI } from 'interfaces/banners';
import { TablePageTemplate as TablePageTemplateI } from 'interfaces/pageTemplates/table';
import { Highlight as HighlightI } from 'interfaces/highlights';
import { League as LeagueI } from 'interfaces/league';

export interface Props {
  menu: PageMenuI;
  page: TablePageTemplateI;
  banners: PageBannersI;
  highlights: HighlightI[];
  priorityLeagues: LeagueI[];
  leagues: LeagueI[];
}

export const getPriorityLeagues = (
  priorityLeagues: LeagueI[],
  leagues: LeagueI[]
) => {
  const filteredLeagues = priorityLeagues.map((league: LeagueI) => {
    const filtered = leagues.filter((entity) => entity.slug === league.slug);
    if (!!filtered.length) {
      league.category_id = filtered[0].databaseId;
    }
    return league;
  });

  return filteredLeagues.filter((entity) => entity.category_id);
};
