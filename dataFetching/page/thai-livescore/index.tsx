import { NODE_ENV } from 'constants/env';
import { Names } from 'constants/initialData';

import { Environments } from 'enums/env';
import { Sections } from 'enums/path';

import { apolloQuery } from 'helpers/apollo';

import { pageByUrl } from 'queries/pageTemplates/thai-livescore';
import { getThailandPriorityLeagues } from 'queries/league';

import { writeUrls, formatUrlsObject } from 'helpers/sitemap';
import { readInitialData } from 'helpers/readInitialData';

import { League as LeagueI } from 'interfaces/league';
import { UrlsEntity } from 'interfaces/sitemap';

import { apolloClient } from 'api/client';

interface Props {
  league?: string;
}

export const getStaticPaths = async (isMobile?: boolean) => {
  const [leagues] = await Promise.all([getThailandPriorityLeagues()]);

  const leaguesSlugList = (leagues as LeagueI[]).map((entity) => entity.slug);

  const livescoreUrls: UrlsEntity[] = [];

  const paths = leaguesSlugList.map((slug: string) => {
    livescoreUrls.push(
      formatUrlsObject({
        url: `${Sections.football}/${Sections.thaiLivescore}/${slug}/`,
      })
    );

    return {
      params: {
        league: slug,
      },
    };
  });

  if (NODE_ENV === Environments.production && !isMobile) {
    writeUrls(livescoreUrls);
  }

  return {
    paths,
    fallback: true,
  };
};

export async function getStaticProps({ league }: Props) {
  const [page, priorityLeagues, banners, menu, livescore, thaiLivescore] =
    await Promise.all([
      apolloQuery({
        callback: () =>
          apolloClient.query({
            query: pageByUrl(),
          }),
        helperText: 'dataFetching > page > thai-livescore',
      }),
      getThailandPriorityLeagues(),
      readInitialData(Names.banners),
      readInitialData(Names.menu),
      readInitialData(Names.livescore),
      readInitialData(Names.thailandLivescore),
    ]).catch((err) => {
      return [];
    });

  const leagueEdges = livescore.leagues;

  const thaiLeagueEdges = thaiLivescore.leagues;

  const isThaiLeagues =
    league &&
    thaiLeagueEdges.map((entity: any) => entity.node.slug).includes(league);

  const countryEdges = livescore.countries;

  return {
    props: {
      ...(page && { page: page.data.page }),
      leagues: leagueEdges,
      leaguesThai: thaiLeagueEdges,
      countries: countryEdges,
      isLeagues: isThaiLeagues,
      priorityLeagues,
      banners,
      menu,
    },
  };
}
