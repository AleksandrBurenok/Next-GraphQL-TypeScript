import { Fixture as FixtureI } from 'interfaces/fixture';
import { Team as TeamI } from 'interfaces/team';

import TeamBoxDesktop from '../../TeamBox/Desktop';

import styles from './styles.module.scss';

interface Props {
  fixture: FixtureI;
  handleH2hPopup: () => void;
  getDataH2H: (localTeam: TeamI, visitorTeam: TeamI) => void;
  onOpenScoreDialog: (id: number) => void;
  isFixture?: boolean;
  formatedTime: string;
}

const TeamDesktop = ({
  fixture,
  handleH2hPopup,
  getDataH2H,
  onOpenScoreDialog,
  isFixture = false,
  formatedTime,
}: Props) => {
  return (
    <>
      <div className={styles.team} key={fixture.id}>
        <TeamBoxDesktop
          fixture={fixture}
          handleH2hPopup={handleH2hPopup}
          getDataH2H={getDataH2H}
          localTeam
          isFixture={isFixture}
          formatedTime={formatedTime}
        />
        {!isFixture ? (
          <button
            type="button"
            className={styles.score}
            onClick={() => onOpenScoreDialog(fixture.id)}
          >
            {`${fixture.scores.localteam_score} : ${fixture.scores.visitorteam_score}`}
          </button>
        ) : (
          <div className={styles.time}>{formatedTime}</div>
        )}
        <TeamBoxDesktop
          fixture={fixture}
          visitorTeam
          isFixture={isFixture}
          formatedTime={formatedTime}
        />
      </div>
    </>
  );
};

export default TeamDesktop;
