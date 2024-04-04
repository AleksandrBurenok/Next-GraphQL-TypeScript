import { NextApiResponse } from 'next';

import { Environments } from 'enums/env';
import { Sections } from 'enums/path';

import { UrlsEntity } from 'interfaces/sitemap';
import { Post } from 'interfaces/post';

import { NODE_ENV } from 'constants/env';
import { SITE_URL } from 'constants/env';

import { formatDateRFC822 } from './date';
export { writeUrls, formatUrlsObject } from '../sitemap';

const baseUrl = {
  [Environments.development]: 'http://localhost:3000',
  [Environments.production]: SITE_URL,
}[NODE_ENV];

export const sitemapResponse = (res: NextApiResponse, pages: UrlsEntity[]) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml">
        ${pages
          .map((entity: UrlsEntity) => {
            return `
            <url>
            <loc>${entity.url}</loc>
            <priority>${entity.priority}</priority>
            </url>
            `;
          })
          .join('')}
      </urlset>
    `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
};

export const getPages = (urls: UrlsEntity[]) => {
  return urls.map((entity: UrlsEntity) => {
    return {
      ...entity,
      url: `${baseUrl}/${entity.url && `${entity.url.replace(/\/$/, '')}/`}`,
    };
  });
};

export const indexSitemapResponse = (res: NextApiResponse, urls: string[]) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map((url) => {
      return `<sitemap>
  <loc>${baseUrl}/${url}</loc>
</sitemap>`;
    })}
  </sitemapindex>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
};

export const postsRssXml = (posts: Post[], isHighlights?: boolean) => {
  let rssItemsXml = '';
  posts.forEach((post) => {
    const postHref = isHighlights
      ? `${baseUrl}/${Sections.highlights}/${post.slug}/`
      : `${baseUrl}/${post.slug}/`;

    rssItemsXml += `
      <item>
        <title>${post.title}</title>
        <link>${postHref}</link>
        <pubDate>${formatDateRFC822(post.date)}</pubDate>
        <description>${post.seo.metaDesc}</description>
        <enclosure url="${post.featuredImage.node.guid}" length="${
      post.featuredImage.node.fileSize
    }" type="image/jpg" />
        <guid isPermaLink="true">${postHref}</guid>
    </item>`;
  });
  return {
    rssItemsXml,
  };
};

export const rssResponse = (
  res: NextApiResponse,
  posts: Post[],
  title: string,
  description: string,
  section: string,
  isHighlights?: boolean
) => {
  const { rssItemsXml } = postsRssXml(posts, isHighlights);

  const rss = `<?xml version="1.0" encoding="utf-8" ?>
  <rss
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    version="2.0"
  >
    <channel>
        <title>${title}</title>
        <link>${baseUrl}/rss/${section}</link>
        <description>${description}</description>
        <language>th</language>
        <atom:link href="${baseUrl}/rss/${section}" rel="self" type="application/rss+xml" />
        ${rssItemsXml}
    </channel>
  </rss>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(rss);
  res.end();
};
