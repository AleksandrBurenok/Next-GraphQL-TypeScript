import { useIntl } from 'react-intl';

import { Banner as BannerI } from 'interfaces/banners';

import { getCkBannerParam } from 'helpers/banners';

import { useRandom, useAdsBannerReport } from 'hooks';

import styles from './styles.module.scss';

interface Props {
  desktop: {
    isGoogleAd: boolean;
    topBanners: BannerI[];
  };
}

const Desktop = ({ desktop }: Props) => {
  const { messages } = useIntl();

  const {
    leftPartBanners,
    rightPartBanners,
    currentIndexLeft,
    currentIndexRight,
  } = useRandom(desktop.topBanners);

  const { onSubmit } = useAdsBannerReport();

  const ckBannerParamLeft = getCkBannerParam(
    leftPartBanners[currentIndexLeft].banner_url
  );

  const ckBannerParamRight = getCkBannerParam(
    rightPartBanners[currentIndexRight].banner_url
  );

  return (
    <div className={styles.bannerWrap}>
      <a
        href={leftPartBanners[currentIndexLeft].banner_url}
        rel="noreferrer nofollow"
        target="_blank"
        key={`key-${leftPartBanners[currentIndexLeft].banner_src}`}
        aria-label={
          leftPartBanners[currentIndexLeft].banner_title || messages.banner
        }
        className={styles.link}
        onClick={() => ckBannerParamLeft && onSubmit(ckBannerParamLeft)}
      >
        <video
          className={styles.banner}
          width="960"
          height="100"
          autoPlay
          loop
          muted
          playsInline
          src={leftPartBanners[currentIndexLeft].banner_src}
        />
      </a>
      <a
        href={rightPartBanners[currentIndexRight].banner_url}
        rel="noreferrer nofollow"
        target="_blank"
        key={`key-${rightPartBanners[currentIndexRight].banner_src}`}
        aria-label={
          rightPartBanners[currentIndexRight].banner_title || messages.banner
        }
        className={styles.link}
        onClick={() => ckBannerParamRight && onSubmit(ckBannerParamRight)}
      >
        <video
          className={styles.banner}
          width="960"
          height="100"
          autoPlay
          loop
          muted
          playsInline
          src={rightPartBanners[currentIndexRight].banner_src}
        />
      </a>
    </div>
  );
};

export default Desktop;
