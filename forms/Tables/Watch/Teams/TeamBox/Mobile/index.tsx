import Image from 'next/image';

import { Props } from '../helpers';

import styles from './styles.module.scss';

const TeamBoxMobile = ({ game }: Props) => {
  return (
    <div className={styles.teamBox}>
      <div className={styles.wrapperTeam}>
        <div className={styles.wrapperNameImg}>
          <div className={styles.wrapperImg}>
            <p className={styles.teamName}>{game.team1.text}</p>
            {game.team1.image && (
              <Image
                src={game.team1.image}
                alt={game.team1.text}
                width="21"
                height="9"
                layout="fixed"
              />
            )}
          </div>
          {game.isLiveNow && (
            <span className={styles.score}>{game.live.home}</span>
          )}
        </div>
        <div className={styles.wrapperNameImg}>
          <div className={styles.wrapperImg}>
            <p className={styles.teamName}>{game.team2.text}</p>
            {game.team2.image && (
              <Image
                src={game.team2.image}
                alt={game.team2.text}
                width="21"
                height="9"
                layout="fixed"
              />
            )}
          </div>
          {game.isLiveNow && (
            <span className={styles.score}>{game.live.away}</span>
          )}
        </div>
      </div>
      <div className={styles.wrapperLeagueTime}>
        <p className={styles.time}>{game.time}</p>
        <p className={styles.timeRemaining}>{game.live.time_remaining}</p>
        <p className={styles.leagueName}>{game.league}</p>
      </div>
    </div>
  );
};

export default TeamBoxMobile;
