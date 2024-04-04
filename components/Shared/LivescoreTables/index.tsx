import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import clsx from 'clsx';
import { useIntl } from 'react-intl';

import { Sections } from 'enums/path';

import { Post as PostI } from 'interfaces/post';

import LogoLivescore from 'icons/LogoLivescore';

import styles from './styles.module.scss';

interface Table {
  node: PostI;
}

interface Props {
  tables: Table[];
  isThai?: boolean;
  title: string;
}

const LivescoreTables = ({ tables, title, isThai = false }: Props) => {
  const [visible, setVisible] = useState(11);
  const { query } = useRouter();
  const { messages } = useIntl();

  const showMore = () => {
    setVisible(visible + 10);
  };

  const showLess = () => {
    setVisible(11);
  };

  return (
    <div className={styles.root}>
      <div className={styles.wrapperTableTitle}>
        <p className={styles.tableTitle}>{title}</p>
      </div>
      <div className={styles.lists}>
        {!!tables.length &&
          tables
            .map((entity) => entity.node)
            .slice(0, visible)
            .map((table) => (
              <a
                href={
                  table.slug && isThai
                    ? `/${Sections.football}/${Sections.thaiLivescore}/${table.slug}/`
                    : !table.slug && !isThai
                    ? `/${Sections.livescore}/`
                    : `/${Sections.livescore}/${table.slug}/`
                }
                className={clsx(
                  styles.list,
                  ((!query.league && !table.slug) ||
                    (table.slug && table.slug === query.league)) &&
                    styles.active
                )}
                key={table.id}
              >
                <div className={styles.wrapper}>
                  {table?.livescoreOther?.iframeImage?.guid ? (
                    <Image
                      alt={table.livescoreOther?.iframeImage?.altText}
                      src={table.livescoreOther?.iframeImage?.guid}
                      width="26"
                      height="26"
                    />
                  ) : (
                    <LogoLivescore className={styles.logo} />
                  )}
                  <span className={styles.text}>
                    {table.pageFields?.shortTitle || table.title}
                  </span>
                </div>
              </a>
            ))}
        {visible < tables.length ? (
          <button
            type="button"
            onClick={showMore}
            className={styles.buttonShow}
          >
            {messages.showMore}
          </button>
        ) : (
          tables.length === visible && (
            <button
              type="button"
              onClick={showLess}
              className={styles.buttonShow}
            >
              {messages.showLess}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default LivescoreTables;
