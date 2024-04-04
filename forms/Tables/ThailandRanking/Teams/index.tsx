import { useState } from 'react';
import { useIntl } from 'react-intl';
import Image from 'next/image';
import clsx from 'clsx';

import { Ranking as RankingI } from 'interfaces/ranking';

import Button from 'components/Shared/Button';

import CopyDialog from '../../Reusable/Dialogs/Copy';
import Header from '../../Reusable/Teams/Header';

import styles from './styles.module.scss';

interface Props {
  ranking: RankingI[];
}

const Teams = ({ ranking }: Props) => {
  const [visible, setVisible] = useState(5);
  const [isOpenSharePopup, setIsOpenSharePopup] = useState(false);

  const { messages } = useIntl();

  const loadMore = () => {
    setVisible(visible + 5);
  };

  const handleSharePopup = () => {
    setIsOpenSharePopup(!isOpenSharePopup);
  };

  return (
    <>
      <div className={styles.root}>
        {ranking.slice(0, visible).map((entity) => (
          <div className={styles.league} key={`league-${entity.id}`}>
            <Header
              handleSharePopup={handleSharePopup}
              translate_code={entity.translate.th.name}
              logo_path={entity.logo_path}
              isFixture
              isLeaders
            />
            <div className={styles.wrapper}>
              <div className={styles.wrapperTeam}>
                <span className={styles.span}>#</span>
                <span className={styles.span}>Club</span>
                <span className={styles.span}>P</span>
                <span className={styles.span}>W</span>
                <span className={styles.span}>D</span>
                <span className={styles.span}>L</span>
                <span className={styles.span}>F</span>
                <span className={styles.span}>A</span>
                <span className={styles.span}>GD</span>
                <span className={styles.span}>PTS</span>
                <span className={styles.span}>Last5</span>
              </div>
              {entity.standings.map((standing) => (
                <div
                  key={`team-${standing.team_id}`}
                  className={clsx(
                    styles.wrapperTeam,
                    standing.position === 1 ||
                      standing.position === 3 ||
                      standing.position === 5
                      ? styles.lightGreen
                      : (standing.position === 2 || standing.position === 4) &&
                          styles.darkGreen
                  )}
                >
                  <span className={styles.span}>{standing.position}</span>
                  <div className={styles.club}>
                    <Image
                      src={standing.logo_path}
                      alt={standing.team_name}
                      width="25"
                      height="25"
                      layout="fixed"
                    />
                    <span className={clsx(styles.span, styles.teamName)}>
                      {standing.team_name}
                    </span>
                  </div>
                  <span className={styles.span}>{standing.statistic.P}</span>
                  <span className={styles.span}>{standing.statistic.W}</span>
                  <span className={styles.span}>{standing.statistic.D}</span>
                  <span className={styles.span}>{standing.statistic.L}</span>
                  <span className={styles.span}>{standing.statistic.F}</span>
                  <span className={styles.span}>{standing.statistic.A}</span>
                  <span className={styles.span}>{standing.statistic.GD}</span>
                  <span className={styles.span}>{standing.statistic.PTS}</span>
                  <span className={styles.span}>
                    {standing.statistic.Last5.map((value, index) => (
                      <span
                        key={`team-${standing.team_id}-${index}`}
                        className={clsx(
                          styles.span,
                          styles.line,
                          value === 'L'
                            ? styles.red
                            : value === 'W'
                            ? styles.green
                            : styles.grey
                        )}
                      ></span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
        {visible < ranking.length && (
          <Button type="button" onClick={loadMore}>
            {messages.loadMore}
          </Button>
        )}
      </div>
      {isOpenSharePopup && <CopyDialog onClose={handleSharePopup} />}
    </>
  );
};

export default Teams;
