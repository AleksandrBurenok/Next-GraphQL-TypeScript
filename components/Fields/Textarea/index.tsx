import { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

import Error from 'components/Fields/Error';

import styles from './styles.module.scss';

interface Props extends ComponentPropsWithoutRef<'textarea'> {
  label: string;
  placeholder?: string;
  error: any;
  classes?: {
    size: string;
  };
  inputProps: any;
}

const Textarea = ({
  label,
  error,
  classes,
  inputProps,
  placeholder,
}: Props) => {
  const { onChange, ...restProps } = inputProps;

  return (
    <div className={clsx(styles.root, classes && classes.size)}>
      {label && <label htmlFor={inputProps.name}>{label}</label>}

      <textarea
        placeholder={placeholder}
        className={clsx(
          classes && classes.size,
          error && styles.error,
          styles.textarea
        )}
        {...restProps}
        onChange={(e: any) => {
          onChange(e);
        }}
      >
        {inputProps.value}
      </textarea>

      {error && <Error error={error} />}
    </div>
  );
};

export default Textarea;
