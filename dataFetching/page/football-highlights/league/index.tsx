import { ApolloQueryResult } from '@apollo/client';

import { NODE_ENV } from 'constants/env';
import { Names } from 'constants/initialData';

import { Environments } from 'enums/env';
import { Sections } from 'enums/path';

import { apolloQuery } from 'helpers/apollo';

import { getLeguesSlugByCategory, categoryByUri } from 'queries/categories';

import { handleCategorySlugLeagues } from 'response/handlers/categories';

import { writeUrls } from 'helpers/sitemap';
import { readInitialData } from 'helpers/readInitialData';

import { CategorySlugLeaguesResponse as CategorySlugLeaguesResponseI } from 'interfaces/categories';
import { UrlsEntity } from 'interfaces/sitemap';

import { apolloClient } from 'api/client';

export async function getStaticPaths(isMobile?: boolean) {
  const response: ApolloQueryResult<CategorySlugLeaguesResponseI> | null =
    await apolloQuery({
      callback: () =>
        apolloClient.query({
          query: getLeguesSlugByCategory({
            id: `${Sections.category}/${Sections.footballHighlights}/`,
          }),
        }),
      helperText: 'dataFetching > page > football-hightlights - static paths',
    });

  const categoriesUrls: UrlsEntity[] = [];

  const paths = response
    ? handleCategorySlugLeagues(response.data).map((slug: string) => {
        return {
          params: {
            league: slug,
          },
        };
      })
    : [];

  if (NODE_ENV === Environments.production && !isMobile) {
    writeUrls(categoriesUrls);
  }

  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps = async ({
  params,
}: {
  params: { league: string };
}) => {
  const { league } = params;

  const [page, banners, menu] = await Promise.all([
    apolloQuery({
      callback: () =>
        apolloClient.query({
          query: categoryByUri({
            urlId: `${Sections.category}/${Sections.footballHighlights}/${league}/`,
            first: 20,
          }),
        }),
      helperText: 'dataFetching > page > football-hightlights - static props',
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

export type GetStaticProps = { params: { league: string } };
