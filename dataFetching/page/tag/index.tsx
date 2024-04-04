import { ApolloQueryResult } from '@apollo/client';

import { NODE_ENV } from 'constants/env';
import { Names } from 'constants/initialData';

import { Environments } from 'enums/env';
import { Sections } from 'enums/path';

import { apolloQuery } from 'helpers/apollo';

import { tagsSlugQuery, tagBySlug } from 'queries/tag';

import { handleTagsResponse } from 'response/handlers/tags';

import { writeUrls, formatUrlsObject } from 'helpers/sitemap';
import { readInitialData } from 'helpers/readInitialData';

import { TagsEdgesNodeResponse as TagsEdgesNodeResponseI } from 'interfaces/tag';
import { UrlsEntity } from 'interfaces/sitemap';

import { apolloClient } from 'api/client';

const AMOUNT = 10000;

export async function getStaticPaths(isMobile?: boolean) {
  const response: ApolloQueryResult<TagsEdgesNodeResponseI> | null =
    await apolloQuery({
      callback: () =>
        apolloClient.query({
          query: tagsSlugQuery({ first: AMOUNT }),
        }),
      helperText: 'dataFetching > page > tag',
    });

  const tagsUrls: UrlsEntity[] = [];

  const paths = response
    ? handleTagsResponse(response.data).map((tag) => {
        tagsUrls.push(
          formatUrlsObject({
            url: `${Sections.tag}/${tag.slug}`,
          })
        );

        return {
          params: { slug: tag.slug },
        };
      })
    : [];

  if (NODE_ENV === Environments.production && !isMobile) {
    writeUrls(tagsUrls);
  }

  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps = async ({ params }: GetStaticProps) => {
  const [page, menu, banners] = await Promise.all([
    apolloQuery({
      callback: () =>
        apolloClient.query({
          query: tagBySlug({
            slugId: params.slug,
          }),
        }),
      helperText: 'dataFetching > page > tag',
    }),
    readInitialData(Names.menu),
    readInitialData(Names.banners),
  ]).catch((err) => {
    return [];
  });

  return {
    props: {
      ...(page && { page: page.data.tag }),
      menu,
      banners,
    },
  };
};

export type GetStaticProps = { params: { slug: string } };
