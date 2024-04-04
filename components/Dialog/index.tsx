import { ReactNode, useEffect, useState, Ref } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { useIntl } from 'react-intl';

import Close from 'icons/Close';

import { RefType } from 'types/ref';

import { createRootElement, getRootElement, generateUuid } from 'helpers';

import styles from './styles.module.scss';

interface Props {
  children: ReactNode;
  open: boolean;
  onClose: (e: any) => void;
  classes?: Classes;
}

const id = generateUuid();

const Dialog = (props: Props) => {
  const [divRef, setDivRef] = useState<Ref<RefType>>(null);
  const [rootCreated, setRootCreated] = useState(false);

  const { messages } = useIntl();

  const { children, open, onClose, classes = {} } = props;

  const onRefChange = (node: any) => {
    if (node) {
      setDivRef(node);
    }
  };

  const divRefMain = divRef as any as HTMLElement;

  const clickOutside = (event: any) => {
    if (divRef && !divRefMain.contains(event.target)) {
      onClose(event);
    }
  };

  useEffect(() => {
    createRootElement(id);

    setRootCreated(true);

    return () => {
      const element = getRootElement(id);

      if (element) {
        element.remove();
      }
    };
  }, []);

  const rootElement = getRootElement(id);

  useEffect(() => {
    if (rootElement) {
      rootElement.addEventListener('click', clickOutside, true);
    }

    return () => {
      if (rootElement) {
        rootElement.removeEventListener('click', clickOutside, true);
      }
    };
  });

  if (rootElement) {
    if (open) {
      rootElement.setAttribute('class', clsx(styles.background, classes.root));
    } else {
      rootElement.removeAttribute('class');
    }
  }

  const onClickClose = (event: any) => {
    onClose(event);
  };

  return (
    <>
      {rootElement &&
        open &&
        rootCreated &&
        createPortal(
          <div className={clsx(styles.root, classes.paper)} ref={onRefChange}>
            <button
              type="button"
              onClick={onClickClose}
              className={clsx(styles.closeIconButton, classes.closeBtn)}
              aria-label={messages.close}
            >
              <Close width={48} height={48} />
            </button>

            <div className={clsx(styles.internal, classes.internal)}>
              <div className={classes.rootInternal}>{children}</div>
            </div>
          </div>,
          rootElement
        )}
    </>
  );
};

const DialogWrapper = (props: Props) => {
  const { open } = props;

  return <>{open && <Dialog {...props} />}</>;
};

interface Classes {
  root?: string;
  paper?: string;
  internal?: string;
  rootInternal?: string;
  closeBtn?: string;
}

Dialog.defaultProps = {
  classes: {
    root: '',
    paper: '',
  },
};

export default DialogWrapper;
