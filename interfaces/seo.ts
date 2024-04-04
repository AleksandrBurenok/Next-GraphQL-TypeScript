import { Keys } from 'enums/seo';

export interface Seo {
  [Keys.title]: string;
  [Keys.metaDesc]: string;
  [Keys.opengraphTitle]: string;
  [Keys.metaKeywords]: string;
  [Keys.opengraphImage]: {
    guid: string;
  };
  [Keys.opengraphDescription]: string;
  [Keys.twitterTitle]: string;
  [Keys.twitterDescription]: string;
  [Keys.twitterImage]: {
    guid: string;
  };
  [Keys.schema]: {
    raw: string;
  };
  [Keys.breadcrumbs]: {
    text: string;
    url: string;
  }[];
  path: string;
}
