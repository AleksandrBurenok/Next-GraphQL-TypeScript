import { apolloClient } from 'queries/apolloClient';
import { categoryPostsIdRss } from 'queries/rss';

import { apolloQuery } from 'helpers/apollo';

export const footballHighlightsRssRequest = () => {
  return apolloQuery({
    callback: () =>
      apolloClient.query({
        query: categoryPostsIdRss({ id: '37' }),
      }),
    helperText: 'dataFetching > rss > football-highlights',
  });
};
