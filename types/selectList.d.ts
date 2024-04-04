export type Name = any;
export type Value = any;

export type List = {
  value: Value;
  name: Name;
};

export type GetValues = (name: string) => string;
export type SetValue = (name: any, value: any, options?: any) => void;
export type SearchBy = string;
export type SetFilters = (params: any) => void;
export type RegisterObject = {
  [key: string]: any;
};
export type Register = any;
export type ValueKey = string;

export type SelectList = List[];
