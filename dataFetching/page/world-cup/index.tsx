import { worldCup } from 'queries/worldCup';
import { categoryByUrl } from 'queries/categories';

import { Names } from 'constants/initialData';

import { Sections } from 'enums/path';

import { apolloQuery } from 'helpers/apollo';
import { readInitialData } from 'helpers/readInitialData';

import { apolloClient } from 'api/client';

export async function getStaticProps() {
  const [championship, category, banners, menu] = await Promise.all([
    apolloQuery({
      callback: () =>
        apolloClient.query({
          query: worldCup(),
        }),
      helperText: 'dataFetching > page > world-cup',
    }),
    apolloQuery({
      callback: () =>
        apolloClient.query({
          query: categoryByUrl({
            urlId: `${Sections.category}/${Sections.footballNews}/`,
            first: 20,
          }),
        }),
      helperText: 'dataFetching > page > world-cup',
    }),
    readInitialData(Names.banners),
    readInitialData(Names.menu),
  ]).catch((err) => {
    return [];
  });

  return {
    props: {
      ...(championship && { championship: championship.data.championship }),
      ...(category && { category: category.data.category }),
      banners,
      menu,
    },
  };
}
