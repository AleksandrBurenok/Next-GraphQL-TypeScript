import Image from 'next/image';
import { useIntl } from 'react-intl';

import { Fixture as FixtureI } from 'interfaces/fixture';

import Ball from 'icons/Ball';

import Dialog from 'components/Dialog';
import Button from 'components/Shared/Button';
import { eventTypes } from 'components/Pages/Livescore/EventTypes';

import styles from './styles.module.scss';

interface Props {
  onClose: () => void;
  data: FixtureI;
}

const Score = ({ onClose, data }: Props) => {
  const { messages } = useIntl();

  return (
    <Dialog
      open
      onClose={onClose}
      classes={{
        paper: styles.paper,
      }}
    >
      <div className={styles.wrapperTitle}>
        <Ball />
        <span className={styles.title}>สด</span>
      </div>
      <div className={styles.header}>
        <div className={styles.localTeam}>
          <div className={styles.wrapperTeam}>
            <div className={styles.teamName}>
              {data.localTeam.translate.th.name}
            </div>
            <Image
              src={data.localTeam.logo_path}
              alt={data.localTeam.translate.th.name}
              width="50"
              height="50"
              layout="fixed"
            />
          </div>
          <div className={styles.score}>{data.scores.localteam_score}</div>
        </div>
        <div className={styles.divider}>-</div>
        <div className={styles.visitorTeam}>
          <div className={styles.score}>{data.scores.visitorteam_score}</div>
          <div className={styles.wrapperTeam}>
            <Image
              src={data.visitorTeam.logo_path}
              alt={data.visitorTeam.translate.th.name}
              width="50"
              height="50"
              layout="fixed"
            />
            <div className={styles.teamName}>
              {data.visitorTeam.translate.th.name}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.events}>
        {!!data.events.length &&
          data.events.map((event) => (
            <div className={styles.event} key={event.id}>
              <div className={styles.localTeam}>
                <div className={styles.matchTeam}>
                  {+event.team_id === data.localTeam.id
                    ? event.player_name
                    : ''}
                </div>
                <div className={styles.teamImage}>
                  {+event.team_id === data.localTeam.id
                    ? eventTypes[event.type]
                    : ''}
                </div>
              </div>
              <div className={styles.matchResult}>
                <div className={styles.result}>{event.result}</div>
                <div className={styles.time}>{event.minute}‘</div>
              </div>
              <div className={styles.visitorTeam}>
                <div className={styles.teamImage}>
                  {+event.team_id === data.visitorTeam.id
                    ? eventTypes[event.type]
                    : ''}
                </div>
                <div className={styles.matchTeam}>
                  {+event.team_id === data.visitorTeam.id
                    ? event.player_name
                    : ''}
                </div>
              </div>
            </div>
          ))}
      </div>
      <Button type="button" onClick={onClose} className={styles.btn}>
        {messages.close}
      </Button>
    </Dialog>
  );
};

export default Score;
