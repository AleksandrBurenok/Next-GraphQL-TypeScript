import { Periods } from 'enums/date';

import { DateValues } from 'interfaces/date';

import { months, monthsFull, days } from 'constants/date';

export const formatDateOnlyTime = (
  date: Date = new Date(),
  periods: boolean
) => {
  let d = new Date(date),
    hours = d.getHours(),
    minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
  let ampm = hours >= 12 ? Periods.PM : Periods.AM;
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${[hours, minutes].join(':')} ${periods ? ampm : ''}`;
};

export const formatDateTime = (date: Date = new Date()) => {
  let d = new Date(date),
    hours = d.getHours(),
    minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
  let month = months[d.getMonth()];
  let day = '' + d.getDate();
  if (day.length < 2) {
    day = '0' + day;
  }
  let ampm = hours >= 12 ? Periods.PM : Periods.AM;
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${[day, month].join(' ')} ${ampm} ${[hours, minutes].join(':')}`;
};

export const formatDateOnlyDayMonth = (date: Date = new Date()) => {
  let d = new Date(date);
  let month = months[d.getMonth()];
  let day = '' + d.getDate();
  if (day.length < 2) {
    day = '0' + day;
  }

  return `${[day, month].join('-')}`;
};

export const formatDateOnlyFullMonthDay = (date: Date = new Date()) => {
  let d = new Date(date);
  let month = monthsFull[d.getMonth()];
  let day = '' + d.getDate();
  if (day.length < 2) {
    day = '0' + day;
  }

  return `${[month, `${day}th`].join(' ')}`;
};

export const formatDateWithYear = (date: Date = new Date()) => {
  let d = new Date(date);
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  let day = '' + d.getDate();
  if (day.length < 2) {
    day = '0' + day;
  }

  return [day, month, year].join(' ');
};

export const formatDateRFC822 = (date: Date = new Date()) => {
  const d = new Date(date);
  const day = days[d.getDay()];
  const dayNumber = addZeroToNumber(d.getDate());
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  const time = `${addZeroToNumber(d.getHours())}:${addZeroToNumber(
    d.getMinutes()
  )}:00`;
  const timezone = '+0700';

  return `${day}, ${dayNumber} ${month} ${year} ${time} ${timezone}`;
};

export const getDateValues = (date: Date): DateValues => {
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  const [hour, minutes, seconds] = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];

  return {
    month,
    day,
    year,
    hour,
    minutes,
    seconds,
  };
};

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFromWhichDayWeekStarts = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export const daysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

export const substractDaysFromDate = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return new Date(d);
};

export const addDaysToDate = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return new Date(d);
};

export const addZeroToNumber = (number: number, startFromOne?: boolean) => {
  let num = number;

  if (startFromOne && !number) {
    num = 1;
  }

  if (startFromOne && number) {
    num += 1;
  }

  return `${num < 10 ? '0' : ''}${num}`;
};

export const getTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getDate = (value: Date) => {
  const date = new Date(value);

  const { day, month, year } = getDateValues(date);

  const newDay = addZeroToNumber(day);
  const newMonth = addZeroToNumber(month, true);
  const newYear = addZeroToNumber(year);

  return `${newYear}-${newMonth}-${newDay}`;
};

export const convertDateString = (str: string, monthFirst = false) => {
  const [year, month, day] = str
    .split('/')
    .reverse()
    .map((value) => Number(value));
  const date = new Date(year, month - 1, day);
  return monthFirst
    ? formatDateOnlyFullMonthDay(date)
    : formatDateOnlyDayMonth(date);
};
