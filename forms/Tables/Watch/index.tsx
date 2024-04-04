import { useIntl } from 'react-intl';

import Preloader from 'icons/Preloader';

import { useWatchFootballData } from '../hooks';

import Teams from './Teams';

import styles from './styles.module.scss';

interface Props {
  isMobile?: boolean;
}

const Watch = ({ isMobile = false }: Props) => {
  const { messages } = useIntl();

  const { isLoading, watchFootball } = useWatchFootballData();

  return (
    <>
      <div className={styles.root}>
        {isLoading && (
          <div className={styles.center}>
            <Preloader />
          </div>
        )}

        {!watchFootball.length && !isLoading && (
          <div className={styles.center}>{messages.noFootballGames}</div>
        )}

        {!!watchFootball.length && (
          <Teams watchFootball={watchFootball} isMobile={isMobile} />
        )}
      </div>
    </>
  );
};

export default Watch;
