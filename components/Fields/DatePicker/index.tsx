import { SetValue, Watch } from 'types/form';

import { Styles } from 'interfaces/props';

import DatePicker from 'components/DatePicker';

interface Props extends Styles {
  watch: Watch<Date>;
  name: string;
  setValue: SetValue;
}

const Picker = ({ watch, name, setValue, className }: Props) => {
  const [date] = watch([name]);

  const setDate = (date: Date) => {
    setValue(name, date);
  };

  return <DatePicker date={date} setDate={setDate} className={className} />;
};

export default Picker;
