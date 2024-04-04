import {
  substractDaysFromDate,
  addDaysToDate,
  addZeroToNumber,
  getDate,
} from 'helpers/date';

export const getText = (dt: Date, isYear?: boolean) =>
  `${addZeroToNumber(dt.getDate())}/${addZeroToNumber(dt.getMonth(), true)}${
    isYear ? `/${dt.getFullYear()}` : ''
  }`;

export const getDateObject = (days: number, substract: boolean) => {
  const date = substract ? substractDaysFromDate(days) : addDaysToDate(days);
  const text = getText(date, false);

  return {
    date: getDate(date),
    text,
  };
};
