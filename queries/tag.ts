import { gql } from '@apollo/client';

import { IdTypes } from 'enums/idTypes';

export const tagsSlugQuery = ({ first = 10 }) => gql`
  query GetTagsSlugList {
    tags(first: ${first}) {
      edges {
        node {
          slug
        }
      }
    }
  }
`;

export const tagBySlug = ({ slugId }: { slugId: string }) => gql`
  query GetTagBySlug {
    tag(id: "${slugId}", idType: ${IdTypes.SLUG}) {
      description
      name
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
        opengraphImage {
          guid
        }
        schema {
          raw
        }
      }
      slug
      posts(first: 15) {
        edges {
          node {
            author {
              node {
                name
              }
            }
            date
            excerpt(format: RENDERED)
            featuredImage {
              node {
                altText
                guid
              }
            }
            id
            title(format: RENDERED)
            slug
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          offsetPagination {
            total
          }
        }
      }
    }
  }
`;

export const postsByTag = gql`
  query GetPostsByTag($first: Int, $slug: [String], $after: String) {
    tags(where: { slug: $slug }) {
      edges {
        node {
          posts(first: $first, after: $after) {
            edges {
              node {
                author {
                  node {
                    name
                  }
                }
                date
                excerpt(format: RENDERED)
                featuredImage {
                  node {
                    altText
                    guid
                  }
                }
                id
                title(format: RENDERED)
                slug
              }
            }
            pageInfo {
              endCursor
              hasNextPage
              offsetPagination {
                total
              }
            }
          }
        }
      }
    }
  }
`;
