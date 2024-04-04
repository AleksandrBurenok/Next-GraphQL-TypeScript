import { useIntl } from 'react-intl';
import Image from 'next/image';

import imagePlaceholder from 'images/image-placeholder.jpg';

import Calendar from 'icons/Calendar';
import Author from 'icons/Author';

import { formatDateWithYear } from 'helpers/date';

import styles from './styles.module.scss';

interface Props {
  image: {
    guid: string;
    altText: string;
  };
  title: string;
  text: string;
  date: Date;
  author: string;
  categoryName: string;
  categoryUrl: string;
}

const Desktop = ({
  image,
  title,
  text,
  date,
  author,
  categoryName,
  categoryUrl,
}: Props) => {
  const { messages } = useIntl();

  const imageAlt = image?.altText || messages.imageAltPlaceholder;

  return (
    <div className={styles.root}>
      <div className={styles.imageWrapper}>
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
        <div className={styles.footer}>
          {title && (
            <h1
              className={`red-left-flag ${styles.cardTitle}`}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
          <div className={styles.wrapperText}>
            {categoryName && categoryUrl && (
              <a href={`/${categoryUrl}/`}>
                <span className={styles.cardCategory}>{categoryName}</span>
              </a>
            )}
            <div className={styles.wrapper}>
              {date && (
                <div className={styles.date}>
                  <Calendar
                    width="12"
                    height="12"
                    className={styles.iconCalendar}
                  />
                  <span className={styles.dateText}>
                    {formatDateWithYear(date)}
                  </span>
                </div>
              )}
              {author && (
                <div className={styles.author}>
                  <Author />
                  <span className={styles.authorText}>{author}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {text && (
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
    </div>
  );
};

export default Desktop;
