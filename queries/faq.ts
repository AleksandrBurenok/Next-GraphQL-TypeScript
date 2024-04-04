import { gql } from '@apollo/client';

import { IdTypes } from 'enums/idTypes';

export const faq = () => gql`
  query GetFaq {
    page(id: "/faq/", idType: ${IdTypes.URI}) {
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
      faq {
        faq {
          answer
          question
        }
      }
    }
  }
`;
