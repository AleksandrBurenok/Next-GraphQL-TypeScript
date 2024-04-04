import { watchFootballThree } from 'queries/pageTemplates/watchFootball';

import { Names } from 'constants/initialData';

import { apolloQuery } from 'helpers/apollo';
import { readInitialData } from 'helpers/readInitialData';

import { apolloClient } from 'api/client';

export async function getStaticProps() {
  const [page, menu, banners] = await Promise.all([
    apolloQuery({
      callback: () =>
        apolloClient.query({
          query: watchFootballThree(),
        }),
      helperText: 'dataFetching > page > ดูบอล-สด',
    }),
    readInitialData(Names.menu),
    readInitialData(Names.banners),
  ]).catch((err) => {
    return [];
  });

  return {
    props: {
      ...(page && { page: page.data.page }),
      menu,
      banners,
    },
  };
}
