import { gql } from '@apollo/client';

import { IdTypes } from 'enums/idTypes';

export const highlightsSlugQuery = ({ categoryId = '37', first = 10 }) => gql`
  query GetHighlightsSlugList {
    posts(where: { categoryIn: ${categoryId} }, first: ${first}) {
      edges {
        node {
          slug
        }
      }
    }
  }
`;

export const highlightBySlug = ({ slugId }: { slugId: string }) => gql`
  query GetHighlightBySlug {
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
      highlights {
        reserveEmbed1
        reserveEmbed2
        reserveEmbed3
      }
    }
  }
`;
