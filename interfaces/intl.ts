import { ReactNode } from 'react';

export interface Messages {
  [key: string]: string;
}

export interface Replacements {
  [key: string]: ReactNode | string | number;
}
