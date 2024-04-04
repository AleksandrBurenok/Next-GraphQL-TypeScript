import Image from 'next/image';

import { Props } from '../helpers';

import styles from './styles.module.scss';

const TeamBoxDesktop = ({ game, team1, team2 }: Props) => {
  return (
    <div className={styles.teamBox}>
      {team1 && (
        <div className={styles.wrapperTeam}>
          <div className={styles.wrapperTime}>
            <p className={styles.time}>{game.time}</p>
            <p className={styles.timeRemaining}>{game.live.time_remaining}</p>
          </div>
          <div className={styles.wrapperImg}>
            {game.team1.image && (
              <Image
                src={game.team1.image}
                alt={game.team1.text}
                width="21"
                height="9"
                layout="fixed"
              />
            )}
            <p className={styles.teamName}>{game.team1.text}</p>
          </div>
        </div>
      )}
      {team2 && (
        <div className={styles.wrapperTeam}>
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
          <p className={styles.leagueName}>{game.league}</p>
        </div>
      )}
    </div>
  );
};

export default TeamBoxDesktop;
