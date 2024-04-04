import { useState, Ref, useEffect, useCallback, useMemo } from 'react';

import { RefType } from 'types/ref';
import { List } from 'types/selectList';

import { generateUuid, preventWrapper } from 'helpers';

import styles from './styles.module.scss';

interface Props {
  list: List[];
  onClose: () => void;
  setValue: any;
  name: string;
  type?: 'number' | 'string';
}

const UlList = ({ list, onClose, setValue, name, type = 'string' }: Props) => {
  const id = useMemo(() => generateUuid(), []);

  const [ulListRef, setUlListRef] = useState<Ref<RefType>>(null);

  const onRefUlListChange = (node: any) => {
    setUlListRef(node);
  };

  const ulListElement = ulListRef as any as HTMLElement;

  const listEventListenerClick = useCallback(
    (e: any) => {
      preventWrapper(() => {
        if (e.target) {
          const { id: targetId } = e.target as HTMLElement;

          setValue(name, type === 'number' ? Number(targetId) : targetId);

          onClose();
        }
      })(e);
    },
    [name, onClose, setValue, type]
  );

  useEffect(() => {
    if (ulListElement) {
      ulListElement.addEventListener('click', listEventListenerClick, true);
    }

    return () => {
      if (ulListElement) {
        ulListElement.removeEventListener(
          'click',
          listEventListenerClick,
          true
        );
      }
    };
  }, [ulListElement, listEventListenerClick]);

  return (
    <ul className={styles.selectList} id={id} ref={onRefUlListChange}>
      {list.map((entity) => {
        return (
          <li
            key={entity.value}
            className={styles.option}
            id={String(entity.value)}
          >
            {entity.name}
          </li>
        );
      })}
    </ul>
  );
};

export default UlList;
