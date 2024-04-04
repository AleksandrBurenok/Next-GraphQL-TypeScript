import { useIntl } from 'react-intl';
import clsx from 'clsx';

import { ADSTERRA_HIGHLIGHT_MOBILE } from 'constants/banners';

import { Highlight as HighlightI } from 'interfaces/highlights';
import { PageBanners as PageBannersI } from 'interfaces/banners';

import { Sections } from 'enums/path';

import Play from 'icons/Play';

import Icon from 'components/Icon';
import AdsterraBanner from 'components/Banners/AdsterraBanner';

import styles from './styles.module.scss';

interface Props {
  highlights: HighlightI[];
  banners: PageBannersI;
  isMobile?: boolean;
}

const TopHighlights = ({ highlights, banners, isMobile = false }: Props) => {
  const { messages } = useIntl();

  return (
    <div className={styles.root}>
      <h1 className="red-left-flag">{messages.buaksibHomepageTitle}</h1>
      <div className={styles.wrapperTitle}>
        <h2 className={`${styles.title} red-left-flag`}>
          {messages.matchHighlights}
        </h2>
        <a className={styles.showAll} href={`/${Sections.footballHighlights}/`}>
          {messages.viewAll}
        </a>
      </div>
      <div className={styles.wrapper}>
        {highlights[0] && (
          <div className={styles.highlight}>
            <a
              className={styles.link}
              title={highlights[0].node.title}
              href={`/${Sections.highlights}/${highlights[0].node.slug}`}
            >
              <div className={styles.imageWrapper}>
                <Play className={styles.icon} />
                {highlights[0].node.featuredImage && (
                  <Icon
                    alt={
                      highlights[0].node.featuredImage.node.altText ||
                      messages.imageAltPlaceholder
                    }
                    src={highlights[0].node.featuredImage.node.guid}
                    priority
                  />
                )}
                {highlights[0].node.tags.edges[0] && (
                  <div className={styles.tag}>
                    {highlights[0].node.tags.edges[0].node.name}
                  </div>
                )}
              </div>
              <p className={styles.title}>{highlights[0].node.title}</p>
            </a>
          </div>
        )}
        {banners.homepageHighlights.homeHighlightsBanners[0] && (
          <div className={clsx(styles.highlight, styles.highlightBanner)}>
            <a
              className={styles.link}
              title={
                banners.homepageHighlights.homeHighlightsBanners[0].banner_title
              }
              href={
                banners.homepageHighlights.homeHighlightsBanners[0].banner_url
              }
              rel="noreferrer nofollow"
              target="_blank"
              aria-label={
                banners.homepageHighlights.homeHighlightsBanners[0]
                  .banner_title || messages.banner
              }
            >
              <div className={styles.imageWrapper}>
                <video
                  className={styles.banner}
                  width="207"
                  height="118"
                  autoPlay
                  loop
                  muted
                  playsInline
                  src={
                    banners.homepageHighlights.homeHighlightsBanners[0]
                      .banner_src
                  }
                />
              </div>
              <p className={styles.title}>
                {
                  banners.homepageHighlights.homeHighlightsBanners[0]
                    .banner_title
                }
              </p>
            </a>
          </div>
        )}
        {highlights[1] && (
          <div className={styles.highlight}>
            <a
              className={styles.link}
              title={highlights[1].node.title}
              href={`/${Sections.highlights}/${highlights[1].node.slug}`}
            >
              <div className={styles.imageWrapper}>
                <Play className={styles.icon} />
                {highlights[1].node.featuredImage && (
                  <Icon
                    alt={
                      highlights[1].node.featuredImage.node.altText ||
                      messages.imageAltPlaceholder
                    }
                    src={highlights[1].node.featuredImage.node.guid}
                    priority
                  />
                )}
                {highlights[1].node.tags.edges[0] && (
                  <div className={styles.tag}>
                    {highlights[1].node.tags.edges[0].node.name}
                  </div>
                )}
              </div>
              <p className={styles.title}>{highlights[1].node.title}</p>
            </a>
          </div>
        )}
        {banners.homepageHighlights.isGoogleAd && isMobile ? (
          <div className={clsx(styles.highlight, styles.highlightBanner)}>
            <div className={styles.link}>
              <AdsterraBanner
                bannerKey={ADSTERRA_HIGHLIGHT_MOBILE}
                height={250}
                width={300}
              />
            </div>
          </div>
        ) : (
          banners.homepageHighlights.homeHighlightsBanners[1] && (
            <div className={clsx(styles.highlight, styles.highlightBanner)}>
              <a
                className={styles.link}
                title={
                  banners.homepageHighlights.homeHighlightsBanners[1]
                    .banner_title
                }
                href={
                  banners.homepageHighlights.homeHighlightsBanners[1].banner_url
                }
                rel="noreferrer nofollow"
                target="_blank"
                aria-label={
                  banners.homepageHighlights.homeHighlightsBanners[1]
                    .banner_title || messages.banner
                }
              >
                <div className={styles.imageWrapper}>
                  <video
                    className={styles.banner}
                    width="207"
                    height="118"
                    autoPlay
                    loop
                    muted
                    playsInline
                    src={
                      banners.homepageHighlights.homeHighlightsBanners[1]
                        .banner_src
                    }
                  />
                </div>
                <p className={styles.title}>
                  {
                    banners.homepageHighlights.homeHighlightsBanners[1]
                      .banner_title
                  }
                </p>
              </a>
            </div>
          )
        )}
        {highlights[2] && (
          <div className={styles.highlight}>
            <a
              className={styles.link}
              title={highlights[2].node.title}
              href={`/${Sections.highlights}/${highlights[2].node.slug}`}
            >
              <div className={styles.imageWrapper}>
                <Play className={styles.icon} />
                {highlights[2].node.featuredImage && (
                  <Icon
                    alt={
                      highlights[2].node.featuredImage.node.altText ||
                      messages.imageAltPlaceholder
                    }
                    src={highlights[2].node.featuredImage.node.guid}
                    priority
                  />
                )}
                {highlights[2].node.tags.edges[0] && (
                  <div className={styles.tag}>
                    {highlights[2].node.tags.edges[0].node.name}
                  </div>
                )}
              </div>
              <p className={styles.title}>{highlights[2].node.title}</p>
            </a>
          </div>
        )}
        {banners.homepageHighlights.homeHighlightsBanners[2] && (
          <div className={clsx(styles.highlight, styles.highlightBanner)}>
            <a
              className={styles.link}
              title={
                banners.homepageHighlights.homeHighlightsBanners[2].banner_title
              }
              href={
                banners.homepageHighlights.homeHighlightsBanners[2].banner_url
              }
              rel="noreferrer nofollow"
              target="_blank"
              aria-label={
                banners.homepageHighlights.homeHighlightsBanners[2]
                  .banner_title || messages.banner
              }
            >
              <div className={styles.imageWrapper}>
                <video
                  className={styles.banner}
                  width="207"
                  height="118"
                  autoPlay
                  loop
                  muted
                  playsInline
                  src={
                    banners.homepageHighlights.homeHighlightsBanners[2]
                      .banner_src
                  }
                />
              </div>
              <p className={styles.title}>
                {
                  banners.homepageHighlights.homeHighlightsBanners[2]
                    .banner_title
                }
              </p>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopHighlights;
