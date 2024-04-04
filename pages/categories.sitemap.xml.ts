import { NextApiResponse } from 'next';

import { UrlsEntity } from 'interfaces/sitemap';

import { sitemapResponse, getPages } from 'helpers/sitemap';

import { categories } from 'config/categories';

import { formatUrlsObject } from '../sitemap';

function Sitemap() {
  return null;
}

const stringUrls = categories.map((entity) => entity.join('/'));

export const getServerSideProps = async ({ res }: { res: NextApiResponse }) => {
  const urls: UrlsEntity[] = [];

  stringUrls.forEach((url: string) => {
    urls.push(
      formatUrlsObject({
        url,
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
