import { UseFormRegisterReturn } from 'react-hook-form';
import { useState, useCallback, useMemo, useRef } from 'react';
import clsx from 'clsx';

import { Field as FieldI } from 'interfaces/field';
import { Styles } from 'interfaces/props';

import { ALL } from 'constants/selectList';

import { SetValue, Watch } from 'types/form';

import { isWindow } from 'helpers';

import { useMountEffect, useOnClickOutside } from 'hooks';

import Field from './Reusable/Field';
import UlList from './Reusable/UlList';

import styles from './styles.module.scss';

interface Props extends Styles {
  register: (name: string) => UseFormRegisterReturn;
  name: string;
  list: FieldI[];
  defaultValue?: string;
  setValue?: SetValue;
  type?: 'string' | 'number';
  watch: Watch<string>;
}

const Select = ({
  register,
  name,
  list,
  className,
  defaultValue,
  setValue,
  type,
  watch,
}: Props) => {
  const value = watch([name]);

  const [anchorEl, setAnchorEl] = useState<any>(null);
  const listRef = useRef(null);

  const onClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);

  const isOpen = useMemo(() => !!(open && list.length), [open, list]);

  useMountEffect(() => {
    if (defaultValue && setValue) {
      setValue(name, defaultValue);
    }
  });

  const { width: offsetWidth = 0 } = anchorEl
    ? anchorEl.getBoundingClientRect()
    : {};

  useOnClickOutside(listRef, onClose);

  if (!isWindow()) return null;

  return (
    <>
      <Field
        list={list}
        open={open}
        setAnchorEl={setAnchorEl}
        className={className}
        inputProps={{ ...register(name) }}
        value={value[0] !== defaultValue ? ALL : value}
      />

      <div
        className={clsx(styles.list, isOpen && styles.open)}
        style={{
          width: offsetWidth + 28,
        }}
        ref={listRef}
      >
        <UlList
          list={list}
          setValue={setValue}
          name={name}
          onClose={onClose}
          type={type}
        />
      </div>
    </>
  );
};

export default Select;
