import DatePicker from 'react-date-picker/dist/entry.nostyle';
import clsx from 'clsx';

import { Styles } from 'interfaces/props';

import Calendar from 'icons/Calendar';

interface Props extends Styles {
  date: Date;
  setDate: (date: Date) => void;
}

const Picker = ({ setDate, date, className }: Props) => {
  return (
    <DatePicker
      onChange={setDate}
      value={date}
      clearIcon={null}
      calendarIcon={<Calendar width="16" height="16" />}
      calendarAriaLabel="Calendar"
      className={clsx(className)}
      next2Label={null}
      prev2Label={null}
      locale="th-TH"
      onClickDay={(value) => setDate(value)}
    />
  );
};

export default Picker;
