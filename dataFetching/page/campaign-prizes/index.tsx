import { campaignPrizes } from 'queries/campaignPrizes';

import { Names } from 'constants/initialData';

import { apolloQuery } from 'helpers/apollo';
import { readInitialData } from 'helpers/readInitialData';

import { apolloClient } from 'api/client';

export async function getStaticProps() {
  const [page, banners, menu] = await Promise.all([
    apolloQuery({
      callback: () =>
        apolloClient.query({
          query: campaignPrizes(),
        }),
      helperText: 'dataFetching > page > campaign-prizes',
    }),
    readInitialData(Names.banners),
    readInitialData(Names.menu),
  ]).catch((err) => {
    return [];
  });

  return {
    props: {
      ...(page && { page: page.data.page }),
      banners,
      menu,
    },
  };
}
