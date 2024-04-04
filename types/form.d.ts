export type SetValue = (
  name: string,
  value: string | number | Date | boolean
) => void;

export type Watch<T> = (fields: string[] | string) => T[];
