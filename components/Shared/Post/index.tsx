import { useIntl } from 'react-intl';
import Image from 'next/image';
import clsx from 'clsx';

import imagePlaceholder from 'images/image-placeholder.jpg';

import { formatDateTime } from 'helpers/date';

import { Sections } from 'enums/path';

import { Banner as BannerI } from 'interfaces/banners';

import Link from 'components/Link';

import styles from './styles.module.scss';

interface Props {
  path: string;
  image: {
    guid: string;
    altText: string;
  };
  title: string;
  text: string;
  tag: string;
  date: Date;
  author?: string;
  isBig?: boolean;
  isMoreNews?: boolean;
  isFullTitle?: boolean;
  banner?: BannerI;
  isHighlights?: boolean;
  isSearch?: boolean;
}

const Post = ({
  path,
  image,
  title,
  text,
  tag,
  date,
  author,
  isBig = false,
  isMoreNews = false,
  isFullTitle = false,
  banner,
  isHighlights = false,
  isSearch = false,
}: Props) => {
  const { messages } = useIntl();
  const imageAlt = image?.altText || messages.imageAltPlaceholder;
  const cardTag = isBig ? (
    <div className={styles.cardTagBig}>{tag}</div>
  ) : (
    <div className={styles.cardTag}>{tag}</div>
  );
  const cardTitle = isBig ? (
    <p
      className={clsx(styles.cardTitleBig)}
      dangerouslySetInnerHTML={{ __html: title }}
    />
  ) : (
    <p
      className={clsx(
        styles.cardTitle,
        isMoreNews && styles.carTitleMoreNews,
        isFullTitle && styles.cardFullTitle
      )}
      dangerouslySetInnerHTML={{ __html: title }}
    />
  );
  const cardText = (
    <div
      className={styles.cardText}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
  const cardDate = date && formatDateTime(date);
  const isContent = title || text;
  const isFooter = date;

  return (
    <>
      <Link
        href={isHighlights ? `/${Sections.highlights}/${path}` : `/${path}`}
        passHref
      >
        <div
          className={clsx(
            styles.card,
            isBig && styles.centralPost,
            isSearch && styles.cardSearch
          )}
        >
          {!isSearch && (
            <div>
              {image ? (
                <Image
                  alt={imageAlt}
                  src={image?.guid}
                  width="16"
                  height="9"
                  layout="responsive"
                  objectFit="cover"
                  priority
                />
              ) : (
                <Image
                  alt={messages.imageAltPlaceholder}
                  src={imagePlaceholder}
                  width="16"
                  height="9"
                  layout="responsive"
                  objectFit="cover"
                  priority
                />
              )}
              {tag && cardTag}
            </div>
          )}

          {isContent && !isFullTitle ? (
            <div
              className={clsx(
                styles.cardContent,
                isMoreNews && styles.cardContentMoreNews
              )}
            >
              {title && cardTitle}
              {text && cardText}
            </div>
          ) : (
            <div
              className={clsx(
                styles.cardContent,
                isMoreNews && styles.cardContentMoreNews
              )}
            >
              {title && cardTitle}
            </div>
          )}

          {isFooter && (
            <div className={styles.footer}>
              {date && (
                <div className={styles.footerItem}>
                  <span>{cardDate}</span>
                </div>
              )}
              {author && (
                <div className={styles.footerItem}>
                  <span>{author}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </Link>
      {banner && (
        <a
          href={banner.banner_url}
          rel="noreferrer nofollow"
          target="_blank"
          key={`key-${banner.banner_src}`}
          aria-label={banner.banner_title || messages.banner}
          className={styles.bannerLink}
        >
          <video
            className={styles.banner}
            width="380"
            height="100"
            autoPlay
            loop
            muted
            playsInline
            src={banner.banner_src}
          />
        </a>
      )}
    </>
  );
};

export default Post;
