import { Names } from 'constants/initialData';

import { homePage } from 'queries/homepage';
import { getPriorityLeagues } from 'queries/league';

import { apolloQuery } from 'helpers/apollo';

import { readInitialData } from 'helpers/readInitialData';

import { apolloClient } from 'api/client';

export async function getStaticProps() {
  const [page, priorityLeagues, banners, menu, homepage] = await Promise.all([
    apolloQuery({
      callback: () =>
        apolloClient.query({
          query: homePage(),
        }),
        helperText: 'dataFetching '
    }),
    getPriorityLeagues(),
    readInitialData(Names.banners),
    readInitialData(Names.menu),
    readInitialData(Names.homepage),
  ]).catch((err) => {
    return [];
  });

  const highlights = homepage.highlights.category;

  const leagueEdges = homepage.leagues;

  return {
    props: {
      ...(page && { page: page.data.page }),
      highlights: highlights.posts.edges,
      priorityLeagues,
      leagues: leagueEdges,
      banners,
      menu,
    },
  };
}
