import { PageBanners as PageBannersI } from 'interfaces/banners';
import { Post as PostI } from 'interfaces/post';

import { SITE_URL } from 'constants/env';

export interface Props {
  page: PostI;
  banners: PageBannersI;
}

export const getSlugs = (page: PostI) => {
  const categoryNames = page.categories.edges.map((entity) => entity.node.name);

  const filteredBreadcrumbs = page.seo.breadcrumbs
    .map((breadcrumb) => {
      page.categories.edges.filter((category) => {
        if (category.node.name === breadcrumb.text) {
          return (breadcrumb.url = category.node.slug);
        }
      });
      return breadcrumb;
    })
    .filter((entity) => categoryNames.includes(entity.text));

  return filteredBreadcrumbs;
};

export const getSocialUrl = (slug: string) => `${SITE_URL}/${slug}/`;

export const getCategoryName = (page: PostI) => getSlugs(page)[0].text;

export const getCategoryUrl = (page: PostI) =>
  getSlugs(page)
    .map((entity) => entity.url)
    .join('/');

export const getCategorySlug = (page: PostI) =>
  getSlugs(page)[getSlugs(page).length - 1].url;
