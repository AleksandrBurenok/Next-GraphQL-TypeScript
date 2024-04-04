import { Sections } from 'enums/path';

import { Names } from 'constants/initialData';

import { categoryByUri } from 'queries/categories';

import { apolloQuery } from 'helpers/apollo';

import { readInitialData } from 'helpers/readInitialData';

import { apolloClient } from 'api/client';

export const getStaticProps = async () => {
  const [page, banners, menu] = await Promise.all([
    apolloQuery({
      callback: () =>
        apolloClient.query({
          query: categoryByUri({
            urlId: `${Sections.category}/${Sections.footballHighlights}/`,
            first: 20,
          }),
        }),
      helperText: 'dataFetching > page > football-highlights',
    }),
    readInitialData(Names.banners),
    readInitialData(Names.menu),
  ]).catch((err) => {
    return [];
  });

  return {
    props: {
      ...(page && { category: page.data.category }),
      banners,
      menu,
    },
  };
};
