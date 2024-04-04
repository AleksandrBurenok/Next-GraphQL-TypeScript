import { gql } from '@apollo/client';

import { IdTypes } from 'enums/idTypes';

export const contactUs = () => gql`
  query GetContactUs {
    page(id: "/contact-us/", idType: ${IdTypes.URI}) {
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
