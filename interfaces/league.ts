import { Country as CountryI } from './country';
import { Fixture as FixtureI } from './fixture';

export interface League {
  id: number;
  logo_path: string;
  name: string;
  translate_code: string;
  country: CountryI;
  slug: string;
  fixtures: FixtureI[];
  databaseId: number;
  category_id: number;
  translate: {
    th: {
      name: string;
    };
  };
}
