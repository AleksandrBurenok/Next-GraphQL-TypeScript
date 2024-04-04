export const getPriorityLeagues = () => {
  return fetch(
    'https://api.buaksib.com/wp-json/lnw-api-football/v1/priority_leagues'
  )
    .then((data) => data.json())
    .then((data) => data);
};

export const getThailandPriorityLeagues = () => {
  return fetch(
    'https://api.buaksib.com/wp-json/lnw-api-football/v1/th_leagues/'
  )
    .then((data) => data.json())
    .then((data) => data);
};
