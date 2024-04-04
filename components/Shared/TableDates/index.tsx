import clsx from 'clsx';

import { Watch } from 'types/form';

import { DatePicker } from 'components/Fields';

import styles from './styles.module.scss';

type DateObject = {
  date: string;
  text: string;
};

interface Props {
  setDate: (data: string) => void;
  date: string;
  name: string;
  setValue: (name: string, value: unknown, config?: Object) => void;
  watch: Watch<Date>;
  isMobile?: boolean;
  dates: DateObject[];
  slice: {
    start?: number;
    end: number;
  };
}

const TableDates = ({
  dates,
  slice,
  isMobile = false,
  setDate,
  name,
  setValue,
  watch,
  date,
}: Props) => {
  const { start, end } = slice;

  const filteredDates = !isMobile
    ? dates
    : slice.start || slice.start === 0
    ? dates.slice(start, end)
    : dates.slice(end);

  const onDateClick = (data: string) => {
    setDate(data);
  };

  return (
    <div className={styles.dates}>
      <DatePicker
        name={name}
        setValue={setValue}
        watch={watch}
        className={styles.date}
      />
      {filteredDates.map((entity) => {
        return (
          <button
            type="button"
            onClick={() => onDateClick(entity.date)}
            key={entity.text}
            className={clsx(styles.date, date === entity.date && styles.active)}
          >
            {entity.text}
          </button>
        );
      })}
    </div>
  );
};

export default TableDates;
