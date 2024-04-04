export const getWatchFootball = () => {
  return fetch('https://api.buaksib.com/wp-json/balza_api/live_score')
    .then((data) => data.json())
    .then((data) => data);
};
