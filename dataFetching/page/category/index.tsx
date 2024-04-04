import { Names } from 'constants/initialData';

import { Sections } from 'enums/path';

import { apolloQuery } from 'helpers/apollo';

import { categoryByUrl } from 'queries/categories';

import { readInitialData } from 'helpers/readInitialData';

import { apolloClient } from 'api/client';

export const getServerSideProps = async ({ params }: GetServerSideProps) => {
  const [page, banners, menu] = await Promise.all([
    apolloQuery({
      callback: () =>
        apolloClient.query({
          query: categoryByUrl({
            urlId: `${Sections.category}/${params.url.join('/')}/`,
            first: 20,
          }),
        }),
      helperText: 'dataFetching > page > category',
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

export type GetServerSideProps = { params: { url: string[] } };
