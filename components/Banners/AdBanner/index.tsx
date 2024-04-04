import { useEffect } from 'react';
import clsx from 'clsx';

import { NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID } from 'constants/urls';

import styles from './styles.module.scss';

interface Props {
  dataAdSlot: string;
}

const AdBanner = ({ dataAdSlot }: Props) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div aria-hidden="true">
      <ins
        className={clsx('adsbygoogle', styles.adBanner)}
        data-ad-client={NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
        data-ad-slot={dataAdSlot}
      />
    </div>
  );
};

export default AdBanner;
