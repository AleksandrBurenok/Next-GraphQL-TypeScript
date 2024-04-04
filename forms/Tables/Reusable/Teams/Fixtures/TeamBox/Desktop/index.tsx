import Image from 'next/image';
import { useIntl } from 'react-intl';
import clsx from 'clsx';

import { Fixture as FixtureI } from 'interfaces/fixture';
import { Team as TeamI } from 'interfaces/team';

import Star from 'icons/Star';

import Tooltip from 'components/Tooltip';
import Button from 'components/Shared/Button';

import FixtureStatus from '../../Status';

import styles from './styles.module.scss';

interface Props {
  fixture: FixtureI;
  localTeam?: boolean;
  visitorTeam?: boolean;
  handleH2hPopup?: () => void;
  getDataH2H?: (localTeam: TeamI, visitorTeam: TeamI) => void;
  isFixture?: boolean;
  formatedTime: string;
}

const TeamBoxDesktop = ({
  fixture,
  localTeam,
  visitorTeam,
  handleH2hPopup,
  getDataH2H,
  isFixture,
  formatedTime,
}: Props) => {
  const { messages } = useIntl();

  return (
    <div
      className={clsx(
        styles.teamBox,
        isFixture && localTeam && styles.teamBoxLeft
      )}
    >
      {localTeam && (
        <>
          {!isFixture && (
            <div className={styles.wrapperFixtureBtn}>
              <FixtureStatus fixture={fixture} formatedTime={formatedTime} />
              {fixture.hasH2H && (
                <Button
                  className={styles.btnH2h}
                  type="button"
                  onClick={() => {
                    handleH2hPopup && handleH2hPopup();
                    getDataH2H &&
                      getDataH2H(fixture.localTeam, fixture.visitorTeam);
                  }}
                >
                  {messages.popular}
                </Button>
              )}
            </div>
          )}
          <div className={styles.wrapperTeam}>
            {!isFixture && (
              <>
                {!!fixture.localTeam.yellowcard.length && (
                  <div className={styles.cardYellow}>
                    {fixture.localTeam.yellowcard.length}
                    <ul className={styles.cardList}>
                      {fixture.localTeam.yellowcard.map((item) => (
                        <li key={`card${item.id}`}>{item.player_name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {!!fixture.localTeam.redcard.length && (
                  <div className={styles.cardRed}>
                    {fixture.localTeam.redcard.length}
                    <ul className={styles.cardList}>
                      {fixture.localTeam.redcard.map((item) => (
                        <li key={`card${item.id}`}>{item.player_name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
            <p className={styles.teamName}>
              {fixture.localTeam.translate.th.name}
            </p>
            <Image
              src={fixture.localTeam.logo_path}
              alt={fixture.localTeam.translate.th.name}
              width="24"
              height="24"
              layout="fixed"
            />
          </div>
        </>
      )}
      {visitorTeam && (
        <>
          <div className={styles.wrapperTeam}>
            <Image
              src={fixture.visitorTeam.logo_path}
              alt={fixture.visitorTeam.translate.th.name}
              width="24"
              height="24"
              layout="fixed"
            />
            <p className={styles.teamName}>
              {fixture.visitorTeam.translate.th.name}
            </p>
            {!isFixture && (
              <>
                {!!fixture.visitorTeam.yellowcard.length && (
                  <div className={styles.cardYellow}>
                    {fixture.visitorTeam.yellowcard.length}
                    <ul className={styles.cardList}>
                      {fixture.visitorTeam.yellowcard.map((item) => (
                        <li key={`card${item.id}`}>{item.player_name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {!!fixture.visitorTeam.redcard.length && (
                  <div className={styles.cardRed}>
                    {fixture.visitorTeam.redcard.length}
                    <ul className={styles.cardList}>
                      {fixture.visitorTeam.redcard.map((item) => (
                        <li key={`card${item.id}`}>{item.player_name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
          {!isFixture && (
            <Tooltip content={messages.clickExperience} direction="top">
              <Star className={styles.iconStar} />
            </Tooltip>
          )}
        </>
      )}
    </div>
  );
};

export default TeamBoxDesktop;
