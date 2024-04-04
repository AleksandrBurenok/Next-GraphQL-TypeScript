import { gql } from '@apollo/client';

export const worldCup = () => gql`
  query GetWorldCup {
    championship(slug: "woldcup-championship-2022") {
      title
      content
      advanced_text
      featuredImage
      title_table
      slug
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
      stages {
        stage_name
        finished
        groups {
          teams {
            name
            place
            icon
            id
          }
          group_name
        }
        stage
      }
      stages_info {
        date_from
        date_to
        label
      }
    }
  }
`;
