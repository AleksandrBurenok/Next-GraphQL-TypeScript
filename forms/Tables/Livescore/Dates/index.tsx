import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import { Watch } from 'types/form';

import { getDate } from 'helpers/date';
import { getDateObject, getText } from 'helpers/tableDate';

import TableDates from 'components/Shared/TableDates';

import { getOrderedNumbersArray } from '../../helpers';

const todayDate = new Date();

interface Props {
  setDate: (data: string) => void;
  date: string;
  name: string;
  setValue: (name: string, value: unknown, config?: Object) => void;
  watch: Watch<Date>;
  isMobile?: boolean;
}

const slice = { start: 0, end: 4 };

const Dates = ({
  setDate,
  date,
  name,
  setValue,
  watch,
  isMobile = false,
}: Props) => {
  const { formatMessageWithParams, messages } = useIntl();

  const dates = useMemo(() => {
    return [
      ...getOrderedNumbersArray(3).map((num) => getDateObject(num, true)),
      !isMobile
        ? {
            date: getDate(todayDate),
            text: formatMessageWithParams(
              messages.liveFootballScoresTodayDate,
              {
                date: getText(todayDate, true),
              }
            ),
          }
        : getDateObject(0, true),
      ...getOrderedNumbersArray(3)
        .reverse()
        .map((num) => getDateObject(num, false)),
    ];
  }, [formatMessageWithParams, messages.liveFootballScoresTodayDate, isMobile]);

  return (
    <TableDates
      dates={dates}
      slice={slice}
      setDate={setDate}
      date={date}
      name={name}
      setValue={setValue}
      watch={watch}
      isMobile={isMobile}
    />
  );
};

export default Dates;
