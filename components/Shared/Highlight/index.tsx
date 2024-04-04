import Calendar from 'icons/Calendar';
import Author from 'icons/Author';

import { formatDateWithYear } from 'helpers/date';

import AdVideo from 'components/AdVideo';

import styles from './styles.module.scss';

interface Props {
  image: string;
  title: string;
  text: string;
  date: Date;
  author: string;
  categoryName: string;
  categoryUrl: string;
  videoFile: string;
  videoIframe: string;
}

const Highlight = ({
  image,
  title,
  text,
  date,
  author,
  categoryName,
  categoryUrl,
  videoFile,
  videoIframe,
}: Props) => {
  return (
    <div className={styles.root}>
      {title && (
        <h1
          className={`red-left-flag ${styles.cardTitle}`}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}

      <div className={styles.wrapperAdVideo}>
        {videoFile && image ? (
          <AdVideo poster={image} videoUrl={videoFile} />
        ) : (
          videoIframe && (
            <div className={styles.iframeWrapper}>
              <iframe
                src={videoIframe}
                title={title}
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                className={styles.iframe}
              />
            </div>
          )
        )}
      </div>
      <div className={styles.footer}>
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
                <Author width="12" height="12" className={styles.iconAuthor} />
                <span className={styles.authorText}>{author}</span>
              </div>
            )}
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

export default Highlight;
