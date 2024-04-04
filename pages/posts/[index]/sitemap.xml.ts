import { NextApiResponse } from 'next';

import { UrlsEntity } from 'interfaces/sitemap';

import { PostsSlug as PostsSlugI } from 'interfaces/post';

import { sitemapResponse, getPages } from 'helpers/sitemap';

import { getRequest, handleResponse } from 'dataFetching/page/post/reusable';
import { formatUrlsObject } from '../../../sitemap';

function Sitemap() {
  return null;
}

const responseAmount = 100;

export const getServerSideProps = async ({
  res,
  params,
}: {
  res: NextApiResponse;
  params: {
    index: string;
  };
}) => {
  const index = Number(params?.index || 0);
  const offset = index ? index * responseAmount : 0;

  const request = getRequest(offset);

  const response = request ? await request.then(handleResponse) : [];

  const urls: UrlsEntity[] = [];

  response.forEach((post: PostsSlugI) => {
    urls.push(
      formatUrlsObject({
        url: post.slug,
      })
    );
  });

  const pages = getPages(urls);

  sitemapResponse(res, pages);

  return {
    props: {},
  };
};

export default Sitemap;
