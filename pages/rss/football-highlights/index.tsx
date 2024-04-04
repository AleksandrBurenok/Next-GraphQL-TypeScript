import { NextApiResponse } from 'next';

import { rssResponse } from 'helpers/sitemap';
import { removeCategoryFromUri } from 'helpers/uri';

import { handlePostsResponse } from 'response/handlers/posts';
import { handleRssResponse } from 'response/handlers/rss';

import { footballHighlightsRssRequest } from 'dataFetching/page/rss/football-highlights';

function Rss() {
  return null;
}

interface GetServerSideProps {
  res: NextApiResponse;
}

export const getServerSideProps = async ({ res }: GetServerSideProps) => {
  const request = footballHighlightsRssRequest();

  const response = request ? await request.then(handleRssResponse) : [];

  const posts = handlePostsResponse(response);
  const title = response.title;
  const description = response.description;
  const section = removeCategoryFromUri(response.uri);

  rssResponse(res, posts, title, description, section, true);

  return {
    props: {},
  };
};

export default Rss;
