import getConfig from 'next/config';

import { Environments } from 'enums/env';

const { publicRuntimeConfig } = getConfig();

export const NODE_ENV = (publicRuntimeConfig.NODE_ENV ||
  process.env.NODE_ENV) as Environments;

export const SITE_URL = (publicRuntimeConfig.SITE_URL ||
  process.env.SITE_URL) as Environments;
