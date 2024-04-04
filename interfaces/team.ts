import { Card as CardI } from './card';

export interface Team {
  id: number;
  name: string;
  logo_path: string;
  yellowcard: CardI[];
  redcard: CardI[];
  translate: {
    th: {
      name: string;
    };
  };
}
