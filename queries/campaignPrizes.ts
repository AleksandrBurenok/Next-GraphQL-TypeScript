import { gql } from '@apollo/client';

import { IdTypes } from 'enums/idTypes';

export const campaignPrizes = () => gql`
  query GetCampaignPrizes {
    page(id: "worldcup-championship-2022-winners", idType: ${IdTypes.URI}) {
      slug
      title
      content
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
      championship_winners {
        fieldGroupName
        stages {
          fieldGroupName
          rewardGalleryImage {
            altText
            guid
          }
          stageName
          winnerName
          prizeName
          rewardImage {
            altText
            guid
            mediaDetails {
              height
              width
            }
          }
        }
      }
    }
  }
`;
