import { useIntl } from 'react-intl';

import { Banner as BannerI } from 'interfaces/banners';

import { getCkBannerParam } from 'helpers/banners';

import { useAdsBannerReport } from 'hooks';

import styles from './styles.module.scss';

interface Props {
  desktop: BannerI[];
}

const Desktop = ({ desktop }: Props) => {
  const { messages } = useIntl();

  const { onSubmit } = useAdsBannerReport();

  return (
    <div className={styles.bannerWrap}>
      {desktop.map(({ banner_url, banner_src, banner_title }: BannerI) => {
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
              width="960"
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

export default Desktop;
