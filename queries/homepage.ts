import { gql } from '@apollo/client';

import { IdTypes } from 'enums/idTypes';

export const homePage = () => gql`
  query GetHomePage {
    page(id: "/", idType: ${IdTypes.URI}) {
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
      home_page {
        categoryId
        categoryTitle
        categorySlug
      }
    }
  }
`;
