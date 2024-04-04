import { Names } from 'constants/initialData';

import { pageBySlug } from 'queries/posts';

import { apolloQuery } from 'helpers/apollo';

import { readInitialData } from 'helpers/readInitialData';

import { apolloClient } from 'api/client';

export const getServerSideProps = async ({ params }: GetServerSideProps) => {
  const [page, banners, menu] = await Promise.all([
    apolloQuery({
      callback: () =>
        apolloClient.query({
          query: pageBySlug({
            slugId: params.slug,
          }),
        }),
      helperText: 'dataFetching > page > post',
    }),
    readInitialData(Names.banners),
    readInitialData(Names.menu),
  ]).catch((err) => {
    return [];
  });

  return {
    props: {
      ...(page && { page: page.data.post }),
      menu,
      banners,
    },
  };
};

export type GetServerSideProps = { params: { slug: string } };
