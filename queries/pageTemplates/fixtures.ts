import { gql } from '@apollo/client';

import { IdTypes } from 'enums/idTypes';

export const pageByUrl = () => gql`
  query GetPageByUrl {
    page(id: "/football-fixtures/", idType: ${IdTypes.URI}) {
      content(format: RENDERED)
      slug
      title
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
      tags(first: 10) {
        edges {
          node {
            id
            name
            slug
          }
        }
      }
    }
  }
`;
