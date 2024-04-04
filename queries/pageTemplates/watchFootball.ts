import { gql } from '@apollo/client';

import { IdTypes } from 'enums/idTypes';

export const watchFootball = () => gql`
  query GetWatchFootball {
    page(id: "/watch-football/", idType: ${IdTypes.URI}) {
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
      football_tables {
        topContent
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

export const watchFootballTwo = () => gql`
  query GetWatchFootballTwo {
    page(id: "/ดูบอล/", idType: ${IdTypes.URI}) {
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
      football_tables {
        topContent
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

export const watchFootballThree = () => gql`
  query GetWatchFootballThree {
    page(id: "/ดูบอล-สด/", idType: ${IdTypes.URI}) {
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
      football_tables {
        topContent
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
