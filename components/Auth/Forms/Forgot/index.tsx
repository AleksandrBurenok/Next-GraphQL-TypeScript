import { useForm, Controller } from 'react-hook-form';
import { useIntl } from 'react-intl';
import clsx from 'clsx';

import { ForgotForm as ForgotFormK } from 'enums/authForms';

import { ForgotForm as ForgotFormI } from 'interfaces/authForms';

import { resetUrl } from 'config/api';

import { getFetchOptions } from 'helpers/fetch';

import { Text } from 'components/Fields';
import Button from 'components/Shared/Button';

import styles from './styles.module.scss';

interface Props {
  closeForgotPopup: () => void;
  showLoginPopup: () => void;
}

const Forgot = ({ closeForgotPopup, showLoginPopup }: Props) => {
  const { messages } = useIntl();

  const { handleSubmit, control, setError } = useForm({
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotFormI) => {
    const response = await fetch(
      resetUrl,
      getFetchOptions<ForgotFormI>({ body: data })
    );
    let json = await response.json();
    if (json.success) {
      closeForgotPopup();
    }
    if (json.error && json.message) {
      setError('email', json.message);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.wrapperText}>
          <p className={styles.title}>{messages.recoverPassword}</p>
          <p className={styles.subTitle}>{messages.enterEmail}</p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name={ForgotFormK.email}
            control={control}
            rules={{
              required: messages.thisValueIsRequired,
            }}
            render={(data) => {
              return (
                <Text
                  placeholder={messages.email}
                  error={data.fieldState.error}
                  type="email"
                  inputProps={data.field}
                  className={styles.field}
                  name={messages.email}
                  id="forgot-email"
                />
              );
            }}
          />
          <Button
            type="submit"
            className={clsx(styles.button, styles.loginButton)}
          >
            {messages.sendInstruction}
          </Button>
        </form>
      </div>
      <div className={styles.wrapperRegister}>
        <Button
          className={clsx(styles.button, styles.registerButton)}
          type="button"
          onClick={showLoginPopup}
        >
          {messages.backToLogin}
        </Button>
      </div>
    </div>
  );
};

export default Forgot;
