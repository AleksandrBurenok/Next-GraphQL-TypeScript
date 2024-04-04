import { apolloClient } from 'queries/apolloClient';
import { categoryPostsIdRss } from 'queries/rss';

import { apolloQuery } from 'helpers/apollo';

export const footballNewsRssRequest = () => {
  return apolloQuery({
    callback: () =>
      apolloClient.query({
        query: categoryPostsIdRss({ id: '9' }),
      }),
    helperText: 'dataFetching > rss > football-news',
  });
};
