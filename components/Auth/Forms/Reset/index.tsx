import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import { ResetForm as ResetFormK } from 'enums/authForms';

import { ResetForm as ResetFormI } from 'interfaces/authForms';

import { useAuth } from 'context/auth';

import { updatePasswordUrl, newPasswordUrl } from 'config/api';

import { getFetchOptions } from 'helpers/fetch';

import { Text } from 'components/Fields';
import Button from 'components/Shared/Button';

import styles from './styles.module.scss';

interface Props {
  closeResetPopup?: () => void;
  isProfile?: boolean;
}

type FormValues = {
  password: string;
  passwordConfirm: string;
  email: string;
  code: string;
};

const Reset = ({ closeResetPopup, isProfile = false }: Props) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const { messages } = useIntl();

  const user = useAuth();

  const { query } = useRouter();

  const { handleSubmit, control, setError, watch, reset } = useForm<FormValues>(
    {
      defaultValues: { password: '', passwordConfirm: '' },
    }
  );

  const onSubmit: SubmitHandler<FormValues> = async (data: ResetFormI) => {
    data.email = query.email as string;
    data.code = query.code as string;
    let response = null;
    if (user.username) {
      response = await fetch(
        updatePasswordUrl,
        getFetchOptions<ResetFormI>({ body: data })
      );
      getFetchOptions<ResetFormI>({ body: data });
    } else {
      response = await fetch(
        newPasswordUrl,
        getFetchOptions<ResetFormI>({ body: data })
      );
    }
    if (response && response.ok) {
      let json = await response.json();
      if (json.success) {
        if (closeResetPopup) {
          closeResetPopup();
        }

        if (isProfile) {
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
          }, 2500);
        }

        reset({});
      }
      if (json.error) {
        setError('password', {
          message: messages.sorryYourUsernameAndPasswordAreIncorrect,
        });
      }
    } else {
      let json = await response.json();
      setError('password', {
        message: messages.sorryYourUsernameAndPasswordAreIncorrect,
      });
      console.error(
        'Login HTTP Error: ' + response.status + '. Error: ' + json.message
      );
    }
  };

  return (
    <div className={styles.root}>
      <div className={clsx(styles.wrapper, isProfile && styles.wrapperProfile)}>
        {!isProfile ? (
          <div className={styles.wrapperText}>
            <p className={styles.title}>{messages.recoverPassword}</p>
            <p className={styles.subTitle}>{messages.pleaseEnterNewPassword}</p>
          </div>
        ) : (
          isSuccess && (
            <div className={styles.successMessage}>{messages.success}</div>
          )
        )}
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name={ResetFormK.password}
            control={control}
            rules={{
              required: messages.thisValueIsRequired,
            }}
            render={(data) => {
              return (
                <Text
                  placeholder={messages.newPassword}
                  error={data.fieldState.error}
                  type="password"
                  inputProps={data.field}
                  className={styles.field}
                  name={messages.newPassword}
                  id="reset-newPassword"
                />
              );
            }}
          />
          <Controller
            name={ResetFormK.passwordConfirm}
            control={control}
            rules={{
              required: messages.thisValueIsRequired,
              validate: (value: string) => {
                if (watch('password') !== value) {
                  return messages.passwordsDoNotMatch;
                }
              },
            }}
            render={(data) => {
              return (
                <Text
                  placeholder={messages.confirmNewPassword}
                  error={data.fieldState.error}
                  type="password"
                  inputProps={data.field}
                  className={styles.field}
                  name={messages.confirmNewPassword}
                  id="reset-confirmNewPassword"
                />
              );
            }}
          />
          <Button type="submit" className={styles.button}>
            {messages.updatePassword}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Reset;
