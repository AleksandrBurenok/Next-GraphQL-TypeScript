import { Messages } from 'interfaces/intl';

import { Regions } from 'enums/regions';

export const regions = (messages: Messages) => [
  {
    url: Regions.en,
    name: messages.english,
    key: 'en',
  },
  {
    url: Regions.hi,
    name: messages.hindi,
    key: 'hi',
  },
];
