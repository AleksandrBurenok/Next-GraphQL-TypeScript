import fs from 'fs';
import { NextApiResponse } from 'next';

import { sitemapResponse, getPages } from 'helpers/sitemap';

import { staticUrls } from 'constants/sitemap';

import getPagesPath from '../getPagesPath';

const pagesPath = getPagesPath();

function Sitemap() {
  return null;
}

interface GetServerSideProps {
  res: NextApiResponse;
}

export const getServerSideProps = ({ res }: GetServerSideProps) => {
  const file = fs.readFileSync(pagesPath, 'utf-8');

  const urls = JSON.parse(file);

  const pages = getPages(staticUrls.concat(urls));

  sitemapResponse(res, pages);

  return {
    props: {},
  };
};

export default Sitemap;
