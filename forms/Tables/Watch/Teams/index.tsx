import { WatchFootball as WatchFootballI } from 'interfaces/watchFootball';

import TeamDesktop from './Team/Desktop';
import TeamMobile from './Team/Mobile';

import styles from './styles.module.scss';

interface Props {
  watchFootball: WatchFootballI[];
  isMobile?: boolean;
}

const Teams = ({ watchFootball, isMobile }: Props) => {
  return (
    <div className={styles.root}>
      {watchFootball.map((entity) => {
        return (
          <>
            {!isMobile ? (
              <TeamDesktop game={entity} />
            ) : (
              <TeamMobile game={entity} />
            )}
          </>
        );
      })}
    </div>
  );
};

export default Teams;
