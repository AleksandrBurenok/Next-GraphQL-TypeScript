import { useIntl } from 'react-intl';

import { Fixture as FixtureI } from 'interfaces/fixture';
import { Team as TeamI } from 'interfaces/team';

import Star from 'icons/Star';

import Button from 'components/Shared/Button';
import Tooltip from 'components/Tooltip';

import FixtureStatus from '../../Status';
import TeamBoxMobile from '../../TeamBox/Mobile';

import styles from './styles.module.scss';

interface Props {
  fixture: FixtureI;
  handleH2hPopup?: () => void;
  getDataH2H?: (localTeam: TeamI, visitorTeam: TeamI) => void;
  onOpenScoreDialog?: (id: number) => void;
  isFixture?: boolean;
  formatedTime: string;
}

const TeamMobile = ({
  fixture,
  handleH2hPopup,
  getDataH2H,
  onOpenScoreDialog,
  isFixture = false,
  formatedTime,
}: Props) => {
  const { messages } = useIntl();

  return (
    <>
      <div className={styles.team} key={fixture.id}>
        <div className={styles.wrapperFixturesTeam}>
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
          <TeamBoxMobile fixture={fixture} isFixture={isFixture} />
        </div>
        <div className={styles.wrapperScore}>
          {!isFixture ? (
            <>
              <button
                type="button"
                className={styles.score}
                onClick={() =>
                  onOpenScoreDialog && onOpenScoreDialog(fixture.id)
                }
              >
                <span className={styles.scoreText}>
                  {fixture.scores.localteam_score}
                </span>
                <span className={styles.scoreText}>
                  {fixture.scores.visitorteam_score}
                </span>
              </button>
              <Tooltip content={messages.clickExperience} direction="top">
                <Star className={styles.iconStar} />
              </Tooltip>
            </>
          ) : (
            <div className={styles.time}>{formatedTime}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default TeamMobile;
