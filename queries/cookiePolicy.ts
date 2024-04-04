import { gql } from '@apollo/client';

import { IdTypes } from 'enums/idTypes';

export const cookiePolicy = () => gql`
  query GetCookiePolicy {
    page(id: "/cookie-policy/", idType: ${IdTypes.URI}) {
      content
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
    }
  }
`;
