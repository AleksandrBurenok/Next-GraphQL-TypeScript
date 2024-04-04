import { useForm, Controller } from 'react-hook-form';
import { useIntl } from 'react-intl';
import clsx from 'clsx';

import { RegisterForm as RegisterFormK } from 'enums/authForms';
import { JsonErrors } from 'enums/jsonErrors';

import { RegisterForm as RegisterFormI } from 'interfaces/authForms';

import { registerUrl } from 'config/api';

import { getFetchOptions } from 'helpers/fetch';

import { Text } from 'components/Fields';
import Button from 'components/Shared/Button';

import styles from './styles.module.scss';

interface Props {
  closeRegisterPopup: () => void;
  showLoginPopup: () => void;
}

const Registration = ({ closeRegisterPopup, showLoginPopup }: Props) => {
  const { messages } = useIntl();

  const { handleSubmit, control, setError } = useForm({
    defaultValues: { username: '', password: '', phone: '', email: '' },
  });

  const onSubmit = (data: RegisterFormI) => {
    fetch(registerUrl, getFetchOptions<RegisterFormI>({ body: data }))
      .then((response) => response.text())
      .then((body) => {
        let data = JSON.parse(body);
        if (data.error && data.message === JsonErrors.username_already_in_use) {
          setError('username', {
            message: data.message,
          });
        }
        if (data.error && data.message === JsonErrors.password_must_be_long) {
          setError('password', {
            message: data.message,
          });
        }
        if (data.error && data.message === JsonErrors.phone_number_invalid) {
          setError('phone', {
            message: data.message,
          });
        }
        if (data.error && data.message === JsonErrors.email_invalid) {
          setError('email', {
            message: data.message,
          });
        }
        if (!data.error) {
          closeRegisterPopup();
        }
      })
      .catch((error) => {
        console.error('Send Request failed', error);
      });
  };

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.wrapperText}>
          <p className={styles.title}>{messages.welcomeToBuaksib}</p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name={RegisterFormK.username}
            control={control}
            rules={{
              required: messages.thisValueIsRequired,
            }}
            render={(data) => {
              return (
                <Text
                  placeholder={messages.username}
                  error={data.fieldState.error}
                  inputProps={data.field}
                  className={styles.field}
                  type="text"
                  name={messages.username}
                  id="register-username"
                />
              );
            }}
          />
          <Controller
            name={RegisterFormK.password}
            control={control}
            rules={{
              required: messages.thisValueIsRequired,
            }}
            render={(data) => {
              return (
                <Text
                  placeholder={messages.password}
                  error={data.fieldState.error}
                  type="password"
                  inputProps={data.field}
                  className={styles.field}
                  name={messages.password}
                  id="register-password"
                />
              );
            }}
          />
          <Controller
            name={RegisterFormK.phone}
            control={control}
            rules={{
              required: messages.thisValueIsRequired,
              pattern:
                /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
            }}
            render={(data) => {
              return (
                <Text
                  placeholder={messages.phone}
                  error={data.fieldState.error}
                  type="tel"
                  inputProps={data.field}
                  className={styles.field}
                  name={messages.phone}
                  id="register-phone"
                />
              );
            }}
          />
          <Controller
            name={RegisterFormK.email}
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
                  id="register-email"
                />
              );
            }}
          />
          <Button
            type="submit"
            className={clsx(styles.button, styles.loginButton)}
          >
            {messages.register}
          </Button>
        </form>
      </div>
      <div className={styles.wrapperRegister}>
        <p className={styles.registerTitle}>{messages.alreadyHaveAccount}</p>
        <Button
          className={clsx(styles.button, styles.registerButton)}
          type="button"
          onClick={showLoginPopup}
        >
          {messages.login}
        </Button>
      </div>
    </div>
  );
};

export default Registration;
