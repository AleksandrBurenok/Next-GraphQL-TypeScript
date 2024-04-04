import { getQueryString } from 'helpers/query';

export const getLiveScore = (params = {}) => {
  return fetch(
    `https://api.buaksib.com/wp-json/lnw-api-football/v1/livescore/?${getQueryString(
      params
    )}`
  )
    .then((data) => data.json())
    .then((data) => data);
};

export const getThailandLiveScore = (params = {}) => {
  return fetch(
    `https://api.buaksib.com/wp-json/lnw-api-football/v1/livescore_th/?${getQueryString(
      params
    )}`
  )
    .then((data) => data.json())
    .then((data) => data);
};

export const getLivescoreH2H = (teamA: number, teamB: number) => {
  return fetch(
    `https://api.buaksib.com/wp-json/lnw-api-football/v1/h2h?localteam=${teamA}&visitorteam=${teamB}`
  )
    .then((data) => data.json())
    .then((data) => data);
};
