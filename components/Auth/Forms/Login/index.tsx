import { useForm, Controller } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import { LoginForm as LoginFormK } from 'enums/authForms';
import { JsonErrors as JsonErrorsK } from 'enums/jsonErrors';

import { LoginForm as LoginFormI } from 'interfaces/authForms';

import { useAuth } from 'context/auth';

import { loginUrl } from 'config/api';

import { getFetchOptions } from 'helpers/fetch';

import { Text } from 'components/Fields';
import {
  setAuthToken,
  setAuthUserName,
  setAuthUserEmail,
  setAuthUserId,
} from 'components/Auth/Utils';
import Button from 'components/Shared/Button';

import styles from './styles.module.scss';

interface Props {
  closeLoginPopup: () => void;
  showRegisterPopup: () => void;
  showForgotPopup: () => void;
}

const Login = ({
  closeLoginPopup,
  showRegisterPopup,
  showForgotPopup,
}: Props) => {
  const { messages } = useIntl();

  const { push } = useRouter();

  const user = useAuth();

  const { handleSubmit, control, setError } = useForm({
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = async (data: LoginFormI) => {
    const response = await fetch(
      loginUrl,
      getFetchOptions<LoginFormI>({ body: data })
    );
    if (response.ok) {
      let json = await response.json();
      if (json.error && json.error_type === JsonErrorsK.player_not_exists) {
        setError('username', {
          message: messages.userDoesNotExist,
        });
      }
      if (json.error && json.error_type === JsonErrorsK.player_not_activated) {
        setError('username', {
          message: messages.pleaseCheckYourEmailAndActivateAccount,
        });
      }
      let token = json.token;
      if (token) {
        setAuthToken(token);
        setAuthUserName(json.user_display_name);
        setAuthUserEmail(json.user_email);
        setAuthUserId(json.user_id);
        user.setUsername(json.user_display_name);
        user.setEmail(json.user_email);
        user.setId(json.user_id);
        const redirectUrl = sessionStorage.getItem('Game-Redirect-Url');
        if (redirectUrl) {
          sessionStorage.removeItem('Game-Redirect-Url');
          push(redirectUrl);
        }
        closeLoginPopup();
      } else {
        setError('username', {
          message: messages.unknownErrorTryAgain,
        });
      }
    } else {
      let json = await response.json();
      setError('username', {
        message: messages.sorryYourUsernameAndPasswordAreIncorrect,
      });
      console.error(
        'Login HTTP Error: ' + response.status + '. Error: ' + json.message
      );
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.wrapperText}>
          <p className={styles.title}>{messages.login}</p>
          <p className={styles.subTitle}>{messages.pleaseLogin}</p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name={LoginFormK.username}
            control={control}
            rules={{
              required: messages.thisValueIsRequired,
            }}
            render={(data) => {
              return (
                <Text
                  placeholder={messages.usernameEmail}
                  error={data.fieldState.error}
                  inputProps={data.field}
                  className={styles.field}
                  type="text"
                  name={messages.usernameEmail}
                  id="login-username"
                />
              );
            }}
          />
          <Controller
            name={LoginFormK.password}
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
                  id="login-password"
                />
              );
            }}
          />
          <Button
            type="submit"
            className={clsx(styles.button, styles.loginButton)}
          >
            {messages.login}
          </Button>
        </form>
        <div className={styles.wrapperButton}>
          <Button
            type="button"
            className={styles.forgotButton}
            onClick={showForgotPopup}
          >
            {messages.forgotYourPassword}
          </Button>
        </div>
      </div>
      <div className={styles.wrapperRegister}>
        <p className={styles.registerTitle}>{messages.notMember}</p>
        <Button
          className={clsx(styles.button, styles.registerButton)}
          type="button"
          onClick={showRegisterPopup}
        >
          {messages.register}
        </Button>
      </div>
    </div>
  );
};

export default Login;
