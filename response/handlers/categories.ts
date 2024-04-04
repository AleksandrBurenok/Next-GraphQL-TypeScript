import {
  Category as CategoryI,
  CategoryEdgesNodeResponse as CategoryEdgesNodeResponseI,
  CategorySlugLeaguesResponse as CategorySlugLeaguesResponseI,
} from 'interfaces/categories';

export const handleCategoriesResponse = (data: CategoryEdgesNodeResponseI) =>
  data
    ? data.categories.edges.map(({ node }: { node: CategoryI }) => node)
    : [];

export const handleCategorySlugLeagues = (data: CategorySlugLeaguesResponseI) =>
  data
    ? data.category.category_fields.subCategories.map(
        ({ slug }: { slug: string }) => slug
      )
    : [];
