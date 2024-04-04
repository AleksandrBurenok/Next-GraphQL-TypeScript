import { gql } from '@apollo/client';

import { IdTypes } from 'enums/idTypes';

export const pagesListQuery = (params?: {
  first?: number;
  categoryId?: string;
}) => {
  const { first = 10, categoryId = '37' } = params || {};

  return gql`
  query GetPostsList {
    posts(where: { categoryNotIn: ${categoryId} }, first: ${first}) {
      edges {
        node {
          title
          id
          slug
          excerpt(format: RENDERED)
          featuredImage {
            node {
              altText
              guid
            }
          }
          date
          tags {
            edges {
              node {
                slug
                name
                id
              }
            }
          }
          author {
            node {
              name
            }
          }
        }
      }
    }
  }
`;
};

export const pageBySlug = ({ slugId }: { slugId: string }) => gql`
  query GetPostBySlug {
    post(id: "${slugId}", idType: ${IdTypes.SLUG}) {
      content
      slug
      title
      id
      seo {
        title
        metaDesc
        opengraphTitle
        opengraphDescription
        metaKeywords
        twitterDescription
        twitterTitle
        twitterImage {
          guid
        }
        breadcrumbs {
          text
          url
        }
        opengraphImage {
          guid
        }
        schema {
          raw
        }
      }
      featuredImage {
        node {
          altText
          guid
        }
      }
      author {
        node {
          name
        }
      }
      date
      tags {
        edges {
          node {
            slug
            name
            id
          }
        }
      }
      categories(first: 10) {
        edges {
          node {
            slug
            name
          }
        }
      }
    }
  }
`;

export const pagesSlugQuery = ({ offset = 0, size = 100 }) => gql`
  query GetPostsSlugList {
    posts(where: { offsetPagination: {offset: ${offset}, size: ${size}}}) {
      edges {
        node {
          slug
        }
      }
    }
  }
`;

export const postsAmount = () => gql`
  query NewQuery {
    posts {
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
`;
