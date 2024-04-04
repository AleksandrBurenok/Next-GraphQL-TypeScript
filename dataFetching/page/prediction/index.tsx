import { Names } from 'constants/initialData';

import { apolloQuery } from 'helpers/apollo';

import { prediction } from 'queries/prediction';
import { worldCup } from 'queries/worldCup';

import { readInitialData } from 'helpers/readInitialData';

import { apolloClient } from 'api/client';

export interface GetServerSideProps {
  params: { id: string };
}

export const getServerSideProps = async ({ params }: GetServerSideProps) => {
  const [page, championship, banners, menu] = await Promise.all([
    apolloQuery({
      callback: () =>
        apolloClient.query({
          query: prediction(),
        }),
      helperText: 'dataFetching > page > world-cup-2022 > prediction',
    }),
    apolloQuery({
      callback: () =>
        apolloClient.query({
          query: worldCup(),
        }),
      helperText: 'dataFetching > page > world-cup-2022 > prediction',
    }),
    readInitialData(Names.banners),
    readInitialData(Names.menu),
  ]).catch((err) => {
    return [];
  });

  return {
    props: {
      ...(page && { page: page.data.page }),
      ...(championship && { championship: championship.data.championship }),
      banners,
      menu,
      id: params.id,
    },
  };
};
