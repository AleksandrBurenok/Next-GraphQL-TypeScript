import { useState } from 'react';
import { useIntl } from 'react-intl';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import { SITE_URL } from 'constants/env';

import Dialog from 'components/Dialog';
import Button from 'components/Shared/Button';

import styles from './styles.module.scss';

interface Props {
  onClose: () => void;
}

const Copy = ({ onClose }: Props) => {
  const [isCopy, setIsCopy] = useState(false);

  const { asPath } = useRouter();

  const { messages } = useIntl();

  const value = `${SITE_URL}${asPath}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(value);
    setIsCopy(!isCopy);
    setTimeout(() => onClose(), 1000);
  };

  return (
    <Dialog
      open
      onClose={onClose}
      classes={{
        paper: styles.paper,
      }}
    >
      <div className={styles.wrapper}>
        <input type="text" className={styles.input} value={value} readOnly />
        <Button
          type="button"
          className={styles.button}
          onClick={handleCopyLink}
        >
          {messages.copyLink}
          <div className={clsx(styles.tooltip, isCopy && styles.visible)}>
            {messages.linkCopied}
          </div>
        </Button>
      </div>
    </Dialog>
  );
};

export default Copy;
