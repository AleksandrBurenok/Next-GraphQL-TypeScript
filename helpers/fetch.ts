import { Methods } from 'enums/methods';

import { getAuthHeader } from 'components/Auth/Utils';

interface Props<T> {
  method?: Methods;
  body?: T;
}

type GetOptions = <T>(props: Props<T>) => {
  method?: Methods;
  body?: string;
  headers: {
    'Content-Type': string;
    token?: string;
  };
};

export const getFetchOptions: GetOptions = ({
  method = Methods.POST,
  body,
}) => {
  const token = getAuthHeader();

  return {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: token }),
    },
  };
};
