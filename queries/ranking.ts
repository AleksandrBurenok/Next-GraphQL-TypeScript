import { getQueryString } from 'helpers/query';

export const getRanking = (params = {}) => {
  return fetch(
    `https://api.buaksib.com/wp-json/lnw-api-football/v1/football_tables/?${getQueryString(
      params
    )}`
  )
    .then((data) => data.json())
    .then((data) => data);
};

export const getThailandRanking = (params = {}) => {
  return fetch(
    `https://api.buaksib.com/wp-json/lnw-api-football/v1/football_tables_th/?${getQueryString(
      params
    )}`
  )
    .then((data) => data.json())
    .then((data) => data);
};
