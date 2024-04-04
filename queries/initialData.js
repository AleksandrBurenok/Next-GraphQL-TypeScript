const { gql } = require('@apollo/client');

export const banners = ({ bannersName }) => gql`
  query GetBanners {
    banners(sections: "${bannersName}") {
      is_google_ads_banner
      section {
        banners {
          banner_src
          banner_title
          banner_url
        }
      }
    }
  }
`;

export const footerMenu = gql`
  query GetFooterMenu {
    menuItems(where: { location: FOOTER_MENU }, first: 200) {
      nodes {
        key: id
        parentId
        title: label
        path
      }
    }
  }
`;

export const mainMenu = gql`
  query GetMainMenu {
    menuItems(where: { location: MAIN_MENU_SEO }, first: 200) {
      nodes {
        key: id
        parentId
        title: label
        path
        menu_item_fields {
          image {
            altText
            mediaItemUrl
          }
        }
      }
    }
  }
`;

export const mainMenuRight = gql`
  query GetMainMenuRight {
    menuItems(where: { location: MAIN_MENU_TOP_RIGHT }, first: 2) {
      nodes {
        key: id
        parentId
        title: label
        path
      }
    }
  }
`;

export const subMenu = gql`
  query GetSubMenu {
    menuItems(where: { location: SUB_MENU_FOOTBALL_NEWS }, first: 200) {
      nodes {
        key: id
        parentId
        title: label
        path
      }
    }
  }
`;

export const pageLivescoreLeagues = () => gql`
  query GetPageLivescoreLeagues {
    page(id: "/leagues-livescore-tables/", idType: URI) {
      children(first: 15) {
        edges {
          node {
            ... on Page {
              id
              title(format: RENDERED)
              slug
              content(format: RENDERED)
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
              tags {
                edges {
                  node {
                    slug
                    name
                    id
                  }
                }
              }
              livescore {
                faq {
                  answer
                  question
                }
              }
              pageFields {
                shortTitle
              }
              livescoreOther {
                iframeImage {
                  altText
                  guid
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const pageLivescoreCountries = () => gql`
  query GetPageLivescoreCountries {
    page(id: "/сountries-livescore-tables/", idType: URI) {
      children(first: 50) {
        edges {
          node {
            ... on Page {
              id
              title(format: RENDERED)
              slug
              content(format: RENDERED)
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
              tags {
                edges {
                  node {
                    slug
                    name
                    id
                  }
                }
              }
              livescore {
                faq {
                  answer
                  question
                }
              }
              pageFields {
                leagues
                shortTitle
              }
              livescoreOther {
                iframeImage {
                  altText
                  guid
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const pageLivescoreThaiLeagues = () => gql`
  query GetPageLivescoreThaiLeagues {
    page(id: "/thai-livescore/", idType: URI) {
      children(first: 15) {
        edges {
          node {
            ... on Page {
              id
              title(format: RENDERED)
              slug
              content(format: RENDERED)
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
              tags {
                edges {
                  node {
                    slug
                    name
                    id
                  }
                }
              }
              livescore {
                faq {
                  answer
                  question
                }
              }
              pageFields {
                shortTitle
              }
              livescoreOther {
                iframeImage {
                  altText
                  guid
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const pageResultsLeagues = () => gql`
  query GetPageResultsLeagues {
    page(id: "/football-results/", idType: URI) {
      children(first: 11) {
        edges {
          node {
            ... on Page {
              id
              title(format: RENDERED)
              slug
              content(format: RENDERED)
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
              football_results {
                topContent
              }
              tags {
                edges {
                  node {
                    slug
                    name
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const pageThailandResultsLeagues = () => gql`
  query GetPageThailandResultsLeagues {
    page(id: "/thai-results/", idType: URI) {
      children(first: 15) {
        edges {
          node {
            ... on Page {
              id
              title(format: RENDERED)
              slug
              content(format: RENDERED)
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
              football_results {
                topContent
              }
              tags {
                edges {
                  node {
                    slug
                    name
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const pageFixturesLeagues = () => gql`
  query GetPageFixturesLeagues {
    page(id: "/football-fixtures/", idType: URI) {
      children(first: 10) {
        edges {
          node {
            ... on Page {
              id
              title(format: RENDERED)
              slug
              content(format: RENDERED)
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
              tags {
                edges {
                  node {
                    slug
                    name
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const pageThailandFixturesLeagues = () => gql`
  query GetPageThailandFixturesLeagues {
    page(id: "/thai-fixtures/", idType: URI) {
      children(first: 15) {
        edges {
          node {
            ... on Page {
              id
              title(format: RENDERED)
              slug
              content(format: RENDERED)
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
              tags {
                edges {
                  node {
                    slug
                    name
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const pageRankingLeagues = () => gql`
  query GetPageRankingLeagues {
    page(id: "/football-ranking/", idType: URI) {
      children(first: 10) {
        edges {
          node {
            ... on Page {
              id
              title(format: RENDERED)
              slug
              content(format: RENDERED)
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
              tags {
                edges {
                  node {
                    slug
                    name
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const pageThailandRankingLeagues = () => gql`
  query GetPageThailandRankingLeagues {
    page(id: "/football-thailand-ranking/", idType: URI) {
      children(first: 15) {
        edges {
          node {
            ... on Page {
              id
              title(format: RENDERED)
              slug
              content(format: RENDERED)
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
              tags {
                edges {
                  node {
                    slug
                    name
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const homePageHighlights = () => gql`
  query GetHomePageHighlights {
    category(id: "/football-highlights/", idType: SLUG) {
      posts(first: 3) {
        edges {
          node {
            featuredImage {
              node {
                altText
                guid
              }
            }
            slug
            tags(first: 1) {
              edges {
                node {
                  name
                }
              }
            }
            id
            title(format: RENDERED)
          }
        }
      }
    }
  }
`;

export const subCategoryByDatabaseID = () => gql`
  query GetFootballNewsSubCategories {
    category(id: "9", idType: DATABASE_ID) {
      category_fields {
        subCategories {
          databaseId
          slug
        }
      }
    }
  }
`;

export const categoriesList = ({ first = 200 }) => gql`
  query GetCategoriesList {
    categories(first: ${first}) {
      edges {
        node {
          uri
        }
      }
    }
  }
`;
