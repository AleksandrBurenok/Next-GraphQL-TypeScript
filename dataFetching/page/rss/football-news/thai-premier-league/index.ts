import { apolloClient } from 'queries/apolloClient';
import { categoryPostsIdRss } from 'queries/rss';

import { apolloQuery } from 'helpers/apollo';

export const thaiPremierLeagueRssRequest = () => {
  return apolloQuery({
    callback: () =>
      apolloClient.query({
        query: categoryPostsIdRss({ id: '34' }),
      }),
    helperText: 'dataFetching > rss > football-news > thai-premier-league',
  });
};
