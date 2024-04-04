import { privacyPolicy } from 'queries/privacyPolicy';

import { Names } from 'constants/initialData';

import { apolloQuery } from 'helpers/apollo';

import { readInitialData } from 'helpers/readInitialData';

import { apolloClient } from 'api/client';

export async function getStaticProps() {
  const [page, menu, banners] = await Promise.all([
    apolloQuery({
      callback: () =>
        apolloClient.query({
          query: privacyPolicy(),
        }),
      helperText: 'dataFetching > page > privacy-policy',
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
