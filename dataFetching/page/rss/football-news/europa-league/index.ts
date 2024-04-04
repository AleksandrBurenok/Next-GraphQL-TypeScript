import { apolloClient } from 'queries/apolloClient';
import { categoryPostsIdRss } from 'queries/rss';

import { apolloQuery } from 'helpers/apollo';

export const europaLeagueRssRequest = () => {
  return apolloQuery({
    callback: () =>
      apolloClient.query({
        query: categoryPostsIdRss({ id: '30' }),
      }),
    helperText: 'dataFetching > rss > football-news > europa-league',
  });
};
