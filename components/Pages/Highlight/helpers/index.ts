import { PageBanners as PageBannersI } from 'interfaces/banners';
import { Post as PostI } from 'interfaces/post';

import { SITE_URL } from 'constants/env';

import { Sections } from 'enums/path';

export interface Props {
  page: PostI;
  banners: PageBannersI;
}

export const getSlugs = (page: PostI) => {
  const arr = page.categories.edges.map((entity) => entity);
  const arrSlugs = arr.length > 2 ? arr.slice(0, 2) : arr;

  return arrSlugs;
};

export const getSocialUrl = (slug: string) =>
  `${SITE_URL}/${Sections.highlights}/${slug}/`;

export const getCategoryName = (page: PostI) => {
  const arr = page.categories.edges.map((entity) => entity);
  const arrName = arr.length > 2 ? arr.slice(0, 2) : arr;
  const categoryName =
    arrName.length === 1 ? arrName[0].node.name : arrName[1].node.name;

  return categoryName;
};

export const getCategoryUrl = (page: PostI) => {
  const filteredSlugs = getSlugs(page);
  const categorySlugs = filteredSlugs.map((entity) => entity.node.slug);
  const slug = categorySlugs.join('/');

  return slug;
};

export const getCategorySlug = (page: PostI) => {
  const filteredSlugs = getSlugs(page);
  const categorySlug =
    filteredSlugs.length === 1
      ? filteredSlugs[0].node.slug
      : filteredSlugs[1].node.slug;

  return categorySlug;
};
