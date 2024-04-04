import { ComponentPropsWithoutRef, useState } from 'react';
import clsx from 'clsx';

import { Styles } from 'interfaces/props';

import EyeBlocked from 'icons/EyeBlocked';
import Eye from 'icons/Eye';

import Error from 'components/Fields/Error';
import Button from 'components/Shared/Button';

import styles from './styles.module.scss';

interface Props extends ComponentPropsWithoutRef<'input'>, Styles {
  label?: string;
  error?: any;
  inputProps: any;
  placeholder?: string;
  type?: string;
  name?: string;
  id: string;
}

const Text = ({
  label,
  error,
  inputProps,
  placeholder,
  className,
  type,
  disabled = false,
  name,
  id,
}: Props) => {
  const [isPassword, setIsPassword] = useState(false);

  const onShowPassword = (id: string) => {
    const passField = document.getElementById(id) as HTMLInputElement;
    if (passField) {
      if (passField.type === 'password') {
        passField.type = 'text';
        setIsPassword(true);
      } else {
        passField.type = 'password';
        setIsPassword(false);
      }
    }
  };

  return (
    <div className={clsx(styles.root, className, disabled && styles.disabled)}>
      {label && <label htmlFor={inputProps.name}>{label}</label>}
      {error && name && <span className={styles.name}>{name}</span>}
      <input
        placeholder={placeholder}
        id={id}
        type={type}
        step="0.01"
        disabled={disabled}
        className={error ? styles.error : ''}
        {...(type === 'number' && {
          pattern: '[0-9]*',
          min: '0',
          inputMode: 'numeric',
        })}
        {...inputProps}
      />

      {type === 'password' && id && (
        <Button
          type="button"
          onClick={() => onShowPassword(id)}
          className={styles.button}
        >
          {isPassword ? <Eye className={styles.icon} /> : <EyeBlocked />}
        </Button>
      )}

      {error && <Error error={error} />}
    </div>
  );
};

export default Text;
