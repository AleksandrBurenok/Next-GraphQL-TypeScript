import { useIntl } from 'react-intl';
import clsx from 'clsx';

import { Banner as BannerI } from 'interfaces/banners';
import { Styles } from 'interfaces/props';

import { getCkBannerParam } from 'helpers/banners';

import { useAdsBannerReport } from 'hooks';

import styles from './styles.module.scss';

interface Props extends Styles {
  mobile: BannerI[];
}

const Mobile = ({ mobile, className }: Props) => {
  const { messages } = useIntl();

  const { onSubmit } = useAdsBannerReport();

  return (
    <div className={clsx(styles.bannerWrap, className)}>
      {mobile.map(({ banner_url, banner_src, banner_title }: BannerI) => {
        const ckBannerParam = getCkBannerParam(banner_url);

        return (
          <a
            href={banner_url}
            rel="noreferrer nofollow"
            target="_blank"
            key={`key-${banner_src}`}
            aria-label={banner_title || messages.banner}
            className={styles.link}
            onClick={() => ckBannerParam && onSubmit(ckBannerParam)}
          >
            <video
              className={styles.banner}
              width="380"
              height="100"
              autoPlay
              loop
              muted
              playsInline
              src={banner_src}
            />
          </a>
        );
      })}
    </div>
  );
};

export default Mobile;
