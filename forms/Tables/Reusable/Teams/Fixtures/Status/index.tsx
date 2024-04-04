import { useIntl } from 'react-intl';

import { FixtureStatuses } from 'enums/fixtureStatuses';

import { Fixture as FixtureI } from 'interfaces/fixture';

import Ball from 'icons/Ball';

import Tooltip from 'components/Tooltip';

import styles from './styles.module.scss';

interface FixtureStatus {
  fixture: FixtureI;
  formatedTime: string;
}

const FixtureStatus = ({ fixture, formatedTime }: FixtureStatus) => {
  const { messages } = useIntl();

  return (
    <>
      {fixture.status === FixtureStatuses.NS && (
        <Tooltip direction="top" content={messages.notStarted}>
          <span className={styles.matchTime}>{formatedTime}</span>
        </Tooltip>
      )}
      {fixture.status === FixtureStatuses.LIVE && (
        <Tooltip direction="top" content={messages.live}>
          <Ball className={styles.iconBall} />
          <span className={styles.matchTime}>{fixture.timer.minute}&apos;</span>
        </Tooltip>
      )}
      {fixture.status === FixtureStatuses.HT && (
        <Tooltip direction="top" content={messages.halfTime}>
          <Ball className={styles.iconBall} />
          <span className={styles.matchTime}>{fixture.timer.minute}&apos;</span>
        </Tooltip>
      )}
      {fixture.status === FixtureStatuses.FT && (
        <Tooltip direction="top" content={messages.fullTime}>
          <span className={styles.matchTime}>{fixture.status}</span>
        </Tooltip>
      )}
      {fixture.status === FixtureStatuses.ET && (
        <Tooltip direction="top" content={messages.extraTime}>
          <Ball className={styles.iconBall} />
          <span className={styles.matchTime}>{fixture.timer.minute}&apos;</span>
        </Tooltip>
      )}
      {fixture.status === FixtureStatuses.PEN_LIVE && (
        <Tooltip direction="top" content={messages.penaltyShootout}>
          <Ball className={styles.iconBall} />
          <span className={styles.matchTime}>{fixture.timer.minute}&apos;</span>
        </Tooltip>
      )}
      {fixture.status === FixtureStatuses.AET && (
        <Tooltip direction="top" content={messages.finishedAfterExtraTime}>
          <Ball className={styles.iconBall} />
          <span className={styles.matchTime}>{fixture.status}</span>
        </Tooltip>
      )}
      {fixture.status === FixtureStatuses.BREAK && (
        <Tooltip direction="top" content={messages.finishedAfterExtraTime}>
          <Ball className={styles.iconBall} />
          <span className={styles.matchTime}>{fixture.timer.minute}&apos;</span>
        </Tooltip>
      )}
      {fixture.status === FixtureStatuses.FT_PEN && (
        <Tooltip direction="top" content={messages.fullTimeAfterPenalties}>
          <span className={styles.matchTime}>{messages.pen}</span>
        </Tooltip>
      )}
      {fixture.status === FixtureStatuses.CANCL && (
        <Tooltip direction="top" content={messages.cancelled}>
          <span className={styles.matchTime}>{messages.cancl}</span>
        </Tooltip>
      )}
      {fixture.status === FixtureStatuses.POSTP && (
        <Tooltip direction="top" content={messages.postPoned}>
          <span className={styles.matchTime}>{messages.postp}</span>
        </Tooltip>
      )}
      {fixture.status === FixtureStatuses.INT && (
        <Tooltip direction="top" content={messages.interrupted}>
          <span className={styles.matchTime}>{messages.int}</span>
        </Tooltip>
      )}
      {fixture.status === FixtureStatuses.ABAN && (
        <Tooltip direction="top" content={messages.abandoned}>
          <span className={styles.matchTime}>{messages.aban}</span>
        </Tooltip>
      )}
      {fixture.status === FixtureStatuses.SUSP && (
        <Tooltip direction="top" content={messages.suspended}>
          <span className={styles.matchTime}>{messages.susp}</span>
        </Tooltip>
      )}
      {fixture.status === FixtureStatuses.AWARDED && (
        <Tooltip direction="top" content={messages.awarded}>
          <span className={styles.matchTime}>{messages.award}</span>
        </Tooltip>
      )}
      {fixture.status === FixtureStatuses.DELAYED && (
        <Tooltip direction="top" content={messages.delayed}>
          <span className={styles.matchTime}>{messages.delayed}</span>
        </Tooltip>
      )}
      {fixture.status === FixtureStatuses.TBA && (
        <Tooltip direction="top" content={messages.toBeAnnounced}>
          <span className={styles.matchTime}>{messages.tba}</span>
        </Tooltip>
      )}
      {fixture.status === FixtureStatuses.WO && (
        <Tooltip direction="top" content={messages.walkOver}>
          <span className={styles.matchTime}>{messages.wo}</span>
        </Tooltip>
      )}
      {fixture.status === FixtureStatuses.AU && (
        <Tooltip direction="top" content={messages.awaitingUpdates}>
          <span className={styles.matchTime}>{messages.au}</span>
        </Tooltip>
      )}
      {fixture.status === FixtureStatuses.Deleted && (
        <Tooltip direction="top" content={messages.deleted}>
          <span className={styles.matchTime}>{messages.deleted}</span>
        </Tooltip>
      )}
    </>
  );
};

export default FixtureStatus;
