import { useState, Ref, ComponentPropsWithoutRef, useMemo } from 'react';
import clsx from 'clsx';

import ArrowDown from 'icons/ArrowDown';

import { List as ListType } from 'types/selectList';
import { RefType } from 'types/ref';

import { Styles } from 'interfaces/props';

import { generateUuid } from 'helpers';

import styles from './styles.module.scss';

interface Props extends ComponentPropsWithoutRef<'select'>, Styles {
  list: ListType[];
  open: boolean;
  setAnchorEl: any;
  inputProps: any;
  value: any;
}

const Field = ({
  list,
  open,
  setAnchorEl,
  className,
  inputProps,
  value,
}: Props) => {
  const id = useMemo(() => `textarea-${generateUuid()}`, []);
  const textId = useMemo(() => generateUuid(), []);

  const [divRef, setDivRef] = useState<Ref<RefType>>(null);

  const onOpen = (event: any) => {
    if (list.length) {
      setAnchorEl(event.currentTarget);
    }
  };

  const onRefChange = (node: any) => {
    setDivRef(node);
  };

  const text = Array.isArray(value)
    ? value
        .map((id) => list.find((entity) => entity.value === id)?.name)
        .filter((entity) => entity)
    : list.find((entity) => String(entity.value) === String(value));

  const divRefMain = divRef as any as HTMLElement;

  const inputElement = document.getElementById(textId) as HTMLInputElement;

  if (inputElement && text) {
    inputElement.innerText = Array.isArray(text)
      ? text.join()
      : (text.name as string);
  }

  return (
    <div
      className={clsx(styles.height, styles.root, className)}
      ref={onRefChange}
    >
      <div
        className={styles.box}
        onClick={onOpen}
        onKeyPress={onOpen}
        role="button"
        tabIndex={-1}
        {...inputProps}
      >
        <div className={clsx(styles.height, styles.input)} id={id}>
          <div id={textId} />
        </div>
        <div className={styles.arrow}>
          <ArrowDown
            className={clsx(open && styles.activeArrow)}
            style={{
              ...(divRefMain && { top: divRefMain?.offsetHeight / 2 - 4 }),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Field;
