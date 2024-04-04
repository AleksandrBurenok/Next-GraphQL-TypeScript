import { apolloClient } from 'api/client';

import { NODE_ENV } from 'constants/env';
import { Names } from 'constants/initialData';

import { Environments } from 'enums/env';
import { Sections } from 'enums/path';

import { apolloQuery } from 'helpers/apollo';

import { writeUrls, formatUrlsObject } from 'helpers/sitemap';
import { readInitialData } from 'helpers/readInitialData';

import { pageByUrl } from 'queries/pageTemplates/thailand-ranking';
import { getThailandPriorityLeagues } from 'queries/league';

import { League as LeagueI } from 'interfaces/league';
import { UrlsEntity } from 'interfaces/sitemap';

interface Props {
  league?: string;
}

export const getStaticPaths = async (isMobile?: boolean) => {
  const leaguesSlugList = (
    (await getThailandPriorityLeagues()) as LeagueI[]
  ).map((entity) => entity.slug);

  const rankingUrls: UrlsEntity[] = [];

  const paths = leaguesSlugList.map((slug: string) => {
    rankingUrls.push(
      formatUrlsObject({
        url: `${Sections.football}/${Sections.thailandRanking}/${slug}/`,
      })
    );

    return {
      params: {
        league: slug,
      },
    };
  });

  if (NODE_ENV === Environments.production && !isMobile) {
    writeUrls(rankingUrls);
  }

  return {
    paths,
    fallback: true,
  };
};

export async function getStaticProps({ league }: Props) {
  const [page, priorityLeagues, banners, menu, ranking] = await Promise.all([
    apolloQuery({
      callback: () =>
        apolloClient.query({
          query: pageByUrl(),
        }),
      helperText: 'dataFetching > page > thailand-ranking',
    }),
    getThailandPriorityLeagues(),
    readInitialData(Names.banners),
    readInitialData(Names.menu),
    readInitialData(Names.thailandRanking),
  ]).catch((err) => {
    return [];
  });

  const leagueEdges = ranking.leagues;

  const isLeagues =
    league &&
    leagueEdges.map((entity: any) => entity.node.slug).includes(league);

  return {
    props: {
      ...(page && { page: page.data.page }),
      leagues: leagueEdges,
      isLeagues: isLeagues,
      priorityLeagues,
      banners,
      menu,
    },
  };
}
