import { gql } from '@apollo/client';

import { IdTypes } from 'enums/idTypes';

export const aboutUs = () => gql`
  query GetAboutUs {
    page(id: "/about-us/", idType: ${IdTypes.URI}) {
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
      featuredImage {
        node {
          guid
          altText
        }
      }
    }
  }
`;
