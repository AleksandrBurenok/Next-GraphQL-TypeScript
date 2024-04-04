import { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import { H2h as H2hI } from 'interfaces/fixture';
import { Livescore as LivescoreI } from 'interfaces/livescore';
import { Team as TeamI } from 'interfaces/team';

import { getLivescoreH2H } from 'queries/livescore';

import { formatDateOnlyTime } from 'helpers/date';

import Button from 'components/Shared/Button';

import CopyDialog from '../Dialogs/Copy';
import Header from '../Teams/Header';
import ScoreDialog from '../Dialogs/Score';
import H2hDialog from '../Dialogs/H2h';
import TeamDesktop from './Fixtures/Team/Desktop';
import TeamMobile from './Fixtures/Team/Mobile';

import styles from './styles.module.scss';

interface Props {
  livescores: LivescoreI[];
  isFixture?: boolean;
  isMobile: boolean;
}

const Teams = ({ livescores, isFixture, isMobile }: Props) => {
  const [fixtureId, setFixtureId] = useState(0);
  const [visible, setVisible] = useState(5);
  const [isOpenSharePopup, setIsOpenSharePopup] = useState(false);
  const [isOpenH2hPopup, setIsOpenH2hPopup] = useState(false);
  const [h2h, setH2h] = useState<H2hI>();

  const { messages } = useIntl();

  const onOpenScoreDialog = (id: number) => {
    setFixtureId(id);
  };

  const loadMore = () => {
    setVisible(visible + 5);
  };

  const onCloseScoreDialog = () => {
    setFixtureId(0);
  };

  const handleSharePopup = () => {
    setIsOpenSharePopup(!isOpenSharePopup);
  };

  const handleH2hPopup = () => {
    setIsOpenH2hPopup(!isOpenH2hPopup);
  };

  const getDataH2H = async (localTeam: TeamI, visitorTeam: TeamI) => {
    const data = await getLivescoreH2H(localTeam.id, visitorTeam.id);
    let h2h_data = {
      localTeam: localTeam,
      visitorTeam: visitorTeam,
      data: data,
    };
    setH2h(h2h_data);
  };

  const scoreDialog = useMemo(() => !!fixtureId, [fixtureId]);

  const fixtures = useMemo(
    () => livescores.map((entity) => entity.fixtures).flat(),
    [livescores]
  );

  const fixture = useMemo(
    () => fixtures.find((entity) => entity.id === fixtureId),
    [fixtures, fixtureId]
  );

  return (
    <>
      <div className={styles.root}>
        {livescores.slice(0, visible).map((entity) => {
          const fixtures = entity.fixtures;
          return (
            <div className={styles.league} key={entity.id}>
              <Header
                handleSharePopup={handleSharePopup}
                translate_code={entity.league.translate_code}
                logo_path={entity.league.logo_path}
                isRightPart
                isFixture={isFixture}
              />

              {fixtures.map((fixture) => {
                const gmtDate = new Date(fixture.time.replace(' ', 'T'));
                const formatedTime = formatDateOnlyTime(gmtDate, false);

                return (
                  <div className={styles.teams} key={fixture.id}>
                    {!isMobile ? (
                      <TeamDesktop
                        fixture={fixture}
                        handleH2hPopup={handleH2hPopup}
                        getDataH2H={getDataH2H}
                        onOpenScoreDialog={onOpenScoreDialog}
                        isFixture={isFixture}
                        formatedTime={formatedTime}
                      />
                    ) : (
                      <TeamMobile
                        fixture={fixture}
                        handleH2hPopup={handleH2hPopup}
                        getDataH2H={getDataH2H}
                        onOpenScoreDialog={onOpenScoreDialog}
                        isFixture={isFixture}
                        formatedTime={formatedTime}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
        {visible < livescores.length && (
          <Button type="button" onClick={loadMore} className={styles.loadMore}>
            {messages.loadMore}
          </Button>
        )}
      </div>
      {scoreDialog && fixture && (
        <ScoreDialog onClose={onCloseScoreDialog} data={fixture} />
      )}
      {isOpenH2hPopup && h2h && (
        <H2hDialog onClose={handleH2hPopup} h2h={h2h} />
      )}
      {isOpenSharePopup && <CopyDialog onClose={handleSharePopup} />}
    </>
  );
};

export default Teams;
