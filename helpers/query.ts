export const getQueryString = (object: { [key: string]: string | number }) => {
  const searchParams = new URLSearchParams();

  Object.entries(object).forEach(([key, value]) => {
    searchParams.append(key, String(value));
  });

  return searchParams.toString();
};
