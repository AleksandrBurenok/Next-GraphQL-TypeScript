import { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useIntl } from 'react-intl';
import clsx from 'clsx';

import { ContactUs as ContactUsI } from 'interfaces/contactUs';
import { Styles } from 'interfaces/props';

import { email as emailPattern } from 'helpers/validation/patterns';

import { Keys as ContactUsK } from 'enums/contactUs';

import { contactUsNonceUrl, contactUsSendUrl } from 'config/api';

import { getFetchOptions } from 'helpers/fetch';

import { Text, Textarea } from 'components/Fields';

import styles from './styles.module.scss';

type FormValues = {
  name: string;
  email: string;
  topic: string;
  message: string;
  nonce: string;
};

const ContactUs = ({ className }: Styles) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<FormValues>({
    defaultValues: { name: '', email: '', topic: '', message: '' },
  });

  const { messages, formatMessageWithParams } = useIntl();

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = (data: ContactUsI) => {
    const nonceUrl = contactUsNonceUrl;
    const sendUrl = contactUsSendUrl;

    fetch(nonceUrl, getFetchOptions<ContactUsI>({ body: data }))
      .then((response) => response.text())
      .then((body) => {
        let values = JSON.parse(body);

        if (values.nonce) {
          data.nonce = values.nonce;
          fetch(sendUrl, getFetchOptions<ContactUsI>({ body: data }))
            .then((response) => response.text())
            .then((body) => {
              let data = JSON.parse(body);

              if (data.success) {
                setShowSuccess(true);
                setTimeout(() => {
                  const success = document.getElementById('success');
                  if (success) {
                    success.style.display = 'none';
                  }
                }, 3000);
              } else {
                setShowError(true);
                setTimeout(() => {
                  const error = document.getElementById('error');
                  if (error) {
                    error.style.display = 'none';
                  }
                }, 3000);
              }
            })
            .catch((error) => {
              setShowError(true);
              console.error('Send Request failed', error);
            });
        } else {
          setShowError(true);
          console.error('Nonce Request failed');
        }
      })
      .catch((error) => {
        setShowError(true);
        console.error('Nonce Request failed', error);
      });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({});
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      {showError && (
        <div id="error" className={styles.wrapperMsg}>
          <span className={styles.errorMsg}>{messages.fieldsHaveErrors}</span>
        </div>
      )}

      {showSuccess && (
        <div id="success" className={styles.wrapperMsg}>
          <span className={styles.successMsg}>{messages.letterSent}</span>
        </div>
      )}
      <form
        className={clsx(styles.root, className)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.wrapper}>
          <div className={styles.wrapperInputs}>
            <Controller
              name={ContactUsK.name}
              control={control}
              rules={{
                required: messages.thisValueIsRequired,
                minLength: {
                  value: 1,
                  message: formatMessageWithParams(messages.minLength, {
                    number: 1,
                  }),
                },
                maxLength: {
                  value: 10,
                  message: formatMessageWithParams(messages.maxLength, {
                    number: 10,
                  }),
                },
              }}
              render={(data) => {
                return (
                  <Text
                    label={messages.contactName}
                    error={data.fieldState.error}
                    inputProps={data.field}
                    id="contactUs-name"
                  />
                );
              }}
            />

            <Controller
              name={ContactUsK.email}
              control={control}
              rules={{
                required: messages.thisValueIsRequired,
                pattern: {
                  value: emailPattern,
                  message: messages.invalidEmailAddress,
                },
              }}
              render={(data) => {
                return (
                  <Text
                    label={messages.email}
                    error={data.fieldState.error}
                    inputProps={data.field}
                    id="contactUs-email"
                  />
                );
              }}
            />
          </div>

          <Controller
            name={ContactUsK.topic}
            control={control}
            rules={{
              required: messages.thisValueIsRequired,
            }}
            render={(data) => {
              return (
                <Text
                  label={messages.theTopic}
                  error={data.fieldState.error}
                  inputProps={data.field}
                  className={styles.inputTopic}
                  id="contactUs-topic"
                />
              );
            }}
          />

          <Controller
            name={ContactUsK.message}
            control={control}
            rules={{
              required: messages.thisValueIsRequired,
            }}
            render={(data) => {
              return (
                <Textarea
                  name={ContactUsK.message}
                  label={messages.theMessage}
                  error={data.fieldState.error}
                  inputProps={data.field}
                />
              );
            }}
          />

          <button className={styles.buttonSubmit} type="submit">
            {messages.sendMessage}
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactUs;
