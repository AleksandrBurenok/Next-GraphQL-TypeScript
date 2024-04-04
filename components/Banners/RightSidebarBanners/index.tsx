import { useIntl } from 'react-intl';

import { ADSTERRA_RIGHTSIDEBAR_BANNER } from 'constants/banners';

import { Banner as BannerI } from 'interfaces/banners';

import { getCkBannerParam } from 'helpers/banners';

import { useAdsBannerReport } from 'hooks';

import AdsterraBanner from '../AdsterraBanner';

import styles from './styles.module.scss';

interface Props {
  rightSidebar: {
    isGoogleAd: boolean;
    rightSidebarBanners: BannerI[];
  };
}

const RightSidebarBanners = ({ rightSidebar }: Props) => {
  const { messages } = useIntl();

  const { onSubmit } = useAdsBannerReport();

  const ckFirstBannerParam = getCkBannerParam(
    rightSidebar.rightSidebarBanners[0].banner_url
  );

  return (
    <div className={styles.bannerWrap}>
      {rightSidebar.isGoogleAd ? (
        <>
          <a
            href={rightSidebar.rightSidebarBanners[0].banner_url}
            rel="noreferrer nofollow"
            target="_blank"
            key={`key-${rightSidebar.rightSidebarBanners[0].banner_src}`}
            aria-label={
              rightSidebar.rightSidebarBanners[0].banner_title ||
              messages.banner
            }
            onClick={() => ckFirstBannerParam && onSubmit(ckFirstBannerParam)}
            className={styles.link}
          >
            <video
              className={styles.banner}
              width="350"
              height="230"
              autoPlay
              loop
              muted
              playsInline
              src={rightSidebar.rightSidebarBanners[0].banner_src}
            />
          </a>
          <div className={styles.link}>
            <AdsterraBanner
              bannerKey={ADSTERRA_RIGHTSIDEBAR_BANNER}
              height={250}
              width={300}
            />
          </div>
          {rightSidebar.rightSidebarBanners
            .slice(1)
            .map(({ banner_url, banner_src, banner_title }: BannerI) => {
              const ckBannerParam = getCkBannerParam(banner_url);

              return (
                <a
                  href={banner_url}
                  rel="noreferrer nofollow"
                  target="_blank"
                  key={`key-${banner_src}`}
                  aria-label={banner_title || messages.banner}
                  onClick={() => ckBannerParam && onSubmit(ckBannerParam)}
                  className={styles.link}
                >
                  <video
                    className={styles.banner}
                    width="350"
                    height="230"
                    autoPlay
                    loop
                    muted
                    playsInline
                    src={banner_src}
                  />
                </a>
              );
            })}
        </>
      ) : (
        rightSidebar.rightSidebarBanners.map(
          ({ banner_url, banner_src, banner_title }: BannerI) => {
            const ckBannerParam = getCkBannerParam(banner_url);

            return (
              <a
                href={banner_url}
                rel="noreferrer nofollow"
                target="_blank"
                key={`key-${banner_src}`}
                aria-label={banner_title || messages.banner}
                onClick={() => ckBannerParam && onSubmit(ckBannerParam)}
                className={styles.link}
              >
                <video
                  className={styles.banner}
                  width="350"
                  height="230"
                  autoPlay
                  loop
                  muted
                  playsInline
                  src={banner_src}
                />
              </a>
            );
          }
        )
      )}
    </div>
  );
};

export default RightSidebarBanners;
