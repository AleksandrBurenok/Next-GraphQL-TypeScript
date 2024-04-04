import { useIntl } from 'react-intl';

import { ADSTERRA_TOP_BANNER_MOBILE } from 'constants/banners';

import { Banner as BannerI } from 'interfaces/banners';

import { getCkBannerParam } from 'helpers/banners';

import { useRandom, useAdsBannerReport } from 'hooks';

import AdsterraBanner from 'components/Banners/AdsterraBanner';

import styles from './styles.module.scss';

export interface Props {
  mobile: {
    isGoogleAd: boolean;
    topBanners: BannerI[];
  };
}

const Mobile = ({ mobile }: Props) => {
  const { messages } = useIntl();

  const {
    leftPartBanners,
    rightPartBanners,
    currentIndexLeft,
    currentIndexRight,
  } = useRandom(mobile.topBanners);

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
          width="380"
          height="100"
          autoPlay
          loop
          muted
          playsInline
          src={leftPartBanners[currentIndexLeft].banner_src}
        />
      </a>
      {!mobile.isGoogleAd ? (
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
            width="380"
            height="100"
            autoPlay
            loop
            muted
            playsInline
            src={rightPartBanners[currentIndexRight].banner_src}
          />
        </a>
      ) : (
        <div className={styles.link}>
          <AdsterraBanner
            bannerKey={ADSTERRA_TOP_BANNER_MOBILE}
            height={50}
            width={320}
          />
        </div>
      )}
    </div>
  );
};

export default Mobile;
