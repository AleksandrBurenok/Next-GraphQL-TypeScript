import { gql } from '@apollo/client';

import { IdTypes } from 'enums/idTypes';

export const categoryByUrl = ({
  urlId,
  first,
}: {
  urlId: string;
  first: number;
}) => gql`
  query GetCategoryByUrl {
    category(id: "${urlId}", idType: ${IdTypes.URI}) {
      title: name
      slug
      uri
      parent {
        node {
          name
          slug
          uri
        }
      }
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
      posts(first: ${first}) {
        edges {
          node {
            date
            slug
            excerpt(format: RENDERED)
            featuredImage {
              node {
                guid
                altText
              }
            }
            id
            tags(first: 1) {
              edges {
                node {
                  name
                }
              }
            }
            title(format: RENDERED)
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
      category_fields {
        subCategories {
          key: id
          title: name
          slug
          uri
          posts(first: 6) {
            edges {
              node {
                date
                slug
                featuredImage {
                  node {
                    guid
                    altText
                  }
                }
                excerpt(format: RENDERED)
                id
                tags(first: 1) {
                  edges {
                    node {
                      name
                    }
                  }
                }
                title(format: RENDERED)
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

export const GET_CATEGORY = gql`
  query GET_CATEGORY($id: ID!, $first: Int, $after: String) {
    category(id: $id, idType: ${IdTypes.URI}) {
      posts(first: $first, after: $after) {
        edges {
          node {
            date
            slug
            excerpt(format: RENDERED)
            featuredImage {
              node {
                guid
                altText
              }
            }
            id
            tags(first: 1) {
              edges {
                node {
                  name
                }
              }
            }
            title(format: RENDERED)
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

export const categoryByID = ({
  id,
  first,
}: {
  id: string;
  first: number;
}) => gql`
  query GetCategoryByID {
    category(id: "${id}", idType: ${IdTypes.DATABASE_ID}) {
      posts(first: ${first}) {
        edges {
          node {
            date
            slug
            excerpt(format: RENDERED)
            featuredImage {
              node {
                guid
                altText
              }
            }
            id
            tags(first: 1) {
              edges {
                node {
                  name
                }
              }
            }
            title(format: RENDERED)
            author {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const categoryBySlug = ({
  slug,
  first = 10,
}: {
  slug: string;
  first: number;
}) => gql`
  query GetCategoryBySlug {
    category(id: "${slug}", idType: ${IdTypes.SLUG}) {
      posts(first: ${first}) {
        edges {
          node {
            id
            date
            slug
            title(format: RENDERED)
          }
        }
      }
    }
  }
`;

export const categoryHighlightsBySlug = ({
  slug,
  first = 10,
}: {
  slug: string;
  first: number;
}) => gql`
  query GetCategoryHighlightsBySlug {
    category(id: "${slug}", idType: ${IdTypes.SLUG}) {
      posts(first: ${first}) {
        edges {
          node {
            id
            date
            slug
            title(format: RENDERED)
            featuredImage {
              node {
                guid
                altText
              }
            }
          }
        }
      }
    }
  }
`;

export const getLeguesSlugByCategory = ({ id }: { id: string }) => gql`
  query GetLeguesSlugByCategory {
    category(id: "${id}", idType: ${IdTypes.URI}) {
      category_fields {
        subCategories {
          slug
        }
      }
    }
  }
`;

export const categoryByUri = ({
  urlId,
  first,
}: {
  urlId: string;
  first: number;
}) => gql`
  query GetCategoryByUri {
    category(id: "${urlId}", idType: ${IdTypes.URI}) {
      title: name
      slug
      uri
      description
      parent {
        node {
          name
        }
      }
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
      posts(first: ${first}) {
        edges {
          node {
            date
            slug
            excerpt(format: RENDERED)
            featuredImage {
              node {
                guid
                altText
              }
            }
            id
            tags(first: 1) {
              edges {
                node {
                  name
                }
              }
            }
            title(format: RENDERED)
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
