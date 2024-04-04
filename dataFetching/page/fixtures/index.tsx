import { apolloClient } from 'api/client';

import { NODE_ENV } from 'constants/env';
import { Names } from 'constants/initialData';

import { Environments } from 'enums/env';
import { Sections } from 'enums/path';

import { apolloQuery } from 'helpers/apollo';

import { writeUrls, formatUrlsObject } from 'helpers/sitemap';
import { readInitialData } from 'helpers/readInitialData';

import { pageByUrl } from 'queries/pageTemplates/fixtures';
import { getPriorityLeagues } from 'queries/league';

import { League as LeagueI } from 'interfaces/league';
import { UrlsEntity } from 'interfaces/sitemap';

interface Props {
  league?: string;
}

export const getStaticPaths = async (isMobile?: boolean) => {
  const leaguesSlugList = ((await getPriorityLeagues()) as LeagueI[]).map(
    (entity) => entity.slug
  );

  const fixturesUrls: UrlsEntity[] = [];

  const paths = leaguesSlugList.map((slug: string) => {
    fixturesUrls.push(
      formatUrlsObject({
        url: `${Sections.football}/${Sections.fixtures}/${slug}/`,
      })
    );

    return {
      params: {
        league: slug,
      },
    };
  });

  if (NODE_ENV === Environments.production && !isMobile) {
    writeUrls(fixturesUrls);
  }

  return {
    paths,
    fallback: true,
  };
};

export async function getStaticProps({ league }: Props) {
  const [page, priorityLeagues, banners, menu, fixtures] = await Promise.all([
    apolloQuery({
      callback: () =>
        apolloClient.query({
          query: pageByUrl(),
        }),
      helperText: 'dataFetching > page > fixtures',
    }),
    getPriorityLeagues(),
    readInitialData(Names.banners),
    readInitialData(Names.menu),
    readInitialData(Names.fixtures),
  ]).catch((err) => {
    return [];
  });

  const leagueEdges = fixtures.leagues;

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
