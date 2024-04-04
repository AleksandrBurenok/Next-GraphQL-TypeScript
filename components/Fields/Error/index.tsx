import { FieldError } from 'react-hook-form';
import { useIntl } from 'react-intl';
import clsx from 'clsx';

import styles from './styles.module.scss';

interface Props {
  error: FieldError;
}

const Error = ({ error }: Props) => {
  const { messages } = useIntl();

  return (
    <>
      {error && (
        <small
          className={clsx(
            styles.p,
            error.message === messages.thisValueIsRequired && styles.required
          )}
        >
          {error.message}
        </small>
      )}
    </>
  );
};

export default Error;
