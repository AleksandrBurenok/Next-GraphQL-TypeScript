import { gql } from '@apollo/client';

import { IdTypes } from 'enums/idTypes';

export const categoryPostsIdRss = ({ id }: { id: string }) => gql`
  query GetCategoryPostsIdRss {
    category(id: "${id}", idType: ${IdTypes.DATABASE_ID}) {
      title: name
      description
      uri
      posts(first: 1000) {
        edges {
          node {
            title
            slug
            date
            seo {
              metaDesc
            }
            featuredImage {
              node {
                guid
                fileSize
              }
            }
          }
        }
      }
    }
  }
`;
