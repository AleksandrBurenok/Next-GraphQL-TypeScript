import { NODE_ENV } from 'constants/env';
import { Names } from 'constants/initialData';

import { Environments } from 'enums/env';
import { Sections } from 'enums/path';

import { pageByUrl } from 'queries/pageTemplates/thai-results';
import { getThailandPriorityLeagues } from 'queries/league';

import { apolloQuery } from 'helpers/apollo';

import { writeUrls, formatUrlsObject } from 'helpers/sitemap';
import { readInitialData } from 'helpers/readInitialData';

import { League as LeagueI } from 'interfaces/league';
import { UrlsEntity } from 'interfaces/sitemap';

import { apolloClient } from 'api/client';

interface Props {
  league?: string;
}

export const getStaticPaths = async (isMobile?: boolean) => {
  const leaguesSlugList = (
    (await getThailandPriorityLeagues()) as LeagueI[]
  ).map((entity) => entity.slug);

  const resultsUrls: UrlsEntity[] = [];

  const paths = leaguesSlugList.map((slug: string) => {
    resultsUrls.push(
      formatUrlsObject({
        url: `${Sections.football}/${Sections.thaiResults}/${slug}/`,
      })
    );

    return {
      params: {
        league: slug,
      },
    };
  });

  if (NODE_ENV === Environments.production && !isMobile) {
    writeUrls(resultsUrls);
  }

  return {
    paths,
    fallback: true,
  };
};

export async function getStaticProps({ league }: Props) {
  const [page, priorityLeagues, banners, menu, results] = await Promise.all([
    apolloQuery({
      callback: () =>
        apolloClient.query({
          query: pageByUrl(),
        }),
      helperText: 'dataFetching > page > thai-results',
    }),
    getThailandPriorityLeagues(),
    readInitialData(Names.banners),
    readInitialData(Names.menu),
    readInitialData(Names.thailandResults),
  ]).catch((err) => {
    return [];
  });

  const leagueEdges = results.leagues;

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
