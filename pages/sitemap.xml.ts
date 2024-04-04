import { NextApiResponse } from 'next';

import { indexSitemapResponse } from 'helpers/sitemap';

import {
  getPostsAmount,
  handleAmountResponse,
} from 'dataFetching/page/post/reusable';

function Sitemap() {
  return null;
}

interface GetServerSideProps {
  res: NextApiResponse;
}

export const getServerSideProps = async ({ res }: GetServerSideProps) => {
  const request = getPostsAmount();

  const response = request ? await request.then(handleAmountResponse) : 0;

  const urls = ['others.sitemap.xml', 'categories.sitemap.xml'].concat(
    [...new Array(Math.round(response / 100)).keys()].map(
      (key) => `posts/${key}/sitemap.xml`
    )
  );

  indexSitemapResponse(res, urls);

  return {
    props: {},
  };
};

export default Sitemap;
