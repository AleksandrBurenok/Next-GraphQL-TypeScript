import { ApolloQueryResult } from '@apollo/client';

import { NODE_ENV } from 'constants/env';
import { Names } from 'constants/initialData';

import { Environments } from 'enums/env';
import { Sections } from 'enums/path';

import { apolloQuery } from 'helpers/apollo';

import { highlightsSlugQuery, highlightBySlug } from 'queries/highlights';

import { handlePostsResponse } from 'response/handlers/posts';

import { writeUrls, formatUrlsObject } from 'helpers/sitemap';
import { readInitialData } from 'helpers/readInitialData';

import { PostEdgesNodeResponse as PostEdgesNodeResponseI } from 'interfaces/post';
import { UrlsEntity } from 'interfaces/sitemap';

import { apolloClient } from 'api/client';

const AMOUNT = 1000000;

export async function getStaticPaths(isMobile?: boolean) {
  const response: ApolloQueryResult<PostEdgesNodeResponseI> | null =
    await apolloQuery({
      callback: () =>
        apolloClient.query({
          query: highlightsSlugQuery({ first: AMOUNT }),
        }),
      helperText: 'dataFetching > page > highlight',
    });

  const postsUrls: UrlsEntity[] = [];

  const paths = response
    ? handlePostsResponse(response.data).map((post) => {
        postsUrls.push(
          formatUrlsObject({
            url: `${Sections.highlights}/${post.slug}`,
          })
        );

        return {
          params: { slug: post.slug },
        };
      })
    : [];

  if (NODE_ENV === Environments.production && !isMobile) {
    writeUrls(postsUrls);
  }

  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps = async ({ params }: GetStaticProps) => {
  const [page, banners, menu] = await Promise.all([
    apolloQuery({
      callback: () =>
        apolloClient.query({
          query: highlightBySlug({
            slugId: params.slug,
          }),
        }),
      helperText: 'dataFetching > page > highlight',
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

export type GetStaticProps = { params: { slug: string } };
