import { useIntl } from 'react-intl';

import {
  Banner as BannerI,
  PageBanners as PageBannersI,
} from 'interfaces/banners';

import { getCkBannerParam } from 'helpers/banners';

import { useAdsBannerReport } from 'hooks';

import Dialog from 'components/Dialog';

import { useSessionPopupBanner } from '../hooks';

import styles from './styles.module.scss';

export interface Props {
  banners: PageBannersI;
}

const Mobile = ({ banners }: Props) => {
  const { messages } = useIntl();

  const { isShowPopupBanner, closeBannerPopup } = useSessionPopupBanner(
    banners.popupBanner.mobile
  );

  const { onSubmit } = useAdsBannerReport();

  return (
    <>
      {isShowPopupBanner && (
        <Dialog
          open
          onClose={closeBannerPopup}
          classes={{
            paper: styles.paper,
            internal: styles.internal,
            rootInternal: styles.rootInternal,
            closeBtn: styles.closeButton,
          }}
        >
          {banners.popupBanner.mobile
            .slice(0, 2)
            .map(({ banner_url, banner_src, banner_title }: BannerI) => {
              const ckBannerParam = getCkBannerParam(banner_url);

              return (
                <a
                  href={banner_url}
                  rel="noreferrer nofollow"
                  target="_blank"
                  key={`key-${banner_src}`}
                  aria-label={banner_title || messages.banner}
                  className={styles.bannerLink}
                  onClick={() => ckBannerParam && onSubmit(ckBannerParam)}
                >
                  <video
                    className={styles.banner}
                    width="288"
                    height="380"
                    autoPlay
                    loop
                    muted
                    playsInline
                    src={banner_src}
                  />
                </a>
              );
            })}
        </Dialog>
      )}
    </>
  );
};

export default Mobile;
