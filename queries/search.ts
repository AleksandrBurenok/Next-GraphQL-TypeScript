import { gql } from '@apollo/client';

export const GET_SEARCH_RESULTS_WITH_TOTAL_PAGES = gql`
  query GET_SEARCH_RESULTS_WITH_TOTAL_PAGES(
    $first: Int
    $after: String
    $query: String
  ) {
    posts(first: $first, after: $after, where: { search: $query }) {
      edges {
        node {
          date
          slug
          excerpt(format: RENDERED)
          id
          title(format: RENDERED)
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
        offsetPagination {
          total
        }
      }
    }
  }
`;

export const GET_SEARCH_RESULTS = gql`
  query GET_SEARCH_RESULTS($first: Int, $after: String, $query: String) {
    posts(first: $first, after: $after, where: { search: $query }) {
      edges {
        node {
          date
          slug
          excerpt(format: RENDERED)
          id
          title(format: RENDERED)
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
