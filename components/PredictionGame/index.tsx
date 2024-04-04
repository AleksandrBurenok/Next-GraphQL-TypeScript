import { useMemo, useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { useIntl } from 'react-intl';

import { useAuth } from 'context/auth';

import { useAuthPopups, usePrevious } from 'hooks';

import { convertDateString } from 'helpers/date';
import { getFetchOptions } from 'helpers/fetch';
import { isEmpty } from 'helpers/lodash';

import {
  championshipUserPrediction,
  getChampionshipUserPrediction,
} from 'config/api';

import { Groups as GroupsE, Stages as StagesE } from 'enums/prediction';
import { Sections } from 'enums/path';

import {
  Group as GroupI,
  Team as TeamI,
  SelectedTeams as SelectedTeamsI,
  SelectedValues as SelectedValuesI,
  Bets as BetsI,
  Championship as ChampionshipI,
  GetBets as GetBetsI,
} from 'interfaces/championship';

import ArrowShare from 'icons/ArrowShare';

import Tabs from 'components/Tabs/Desktop';
import Tab from 'components/Tabs/Tab';
import Button from 'components/Shared/Button';
import Popups from 'components/Auth/Popups';
import Link from 'components/Link';

import Header from './Header';
import GroupsFirstStage from './GroupsFirstStage';
import Groups from './Groups';
import { findTeamFromGroups, findTeamFromGroupsSecondPlace } from './helpers';

import styles from './styles.module.scss';

interface Props {
  championship: ChampionshipI;
}

const PredictionGame = ({ championship }: Props) => {
  const { messages } = useIntl();

  const user = useAuth();

  const {
    showLoginPopup,
    showRegisterPopup,
    showForgotPopup,
    showLoginPopupFunc,
    closeLoginPopupFunc,
    showRegisterPopupFunc,
    closeRegisterPopupFunc,
    showForgotPopupFunc,
    closeForgotPopupFunc,
  } = useAuthPopups();

  const [userPredictions, setUserPredictions] = useState<SelectedTeamsI>(
    {} as SelectedTeamsI
  );

  const getUserPredictions = useCallback(async () => {
    const response = await fetch(
      getChampionshipUserPrediction,
      getFetchOptions<GetBetsI>({
        body: {
          ref: championship.slug,
          user: user.id,
        },
      })
    );

    let json = await response.json();

    if (json) {
      setUserPredictions(json);
    }
  }, [user, championship.slug]);

  const clickItem = useMemo(
    () => ({
      name: messages.clickTheCountryYouThinkWillBe,
      place: 1,
      icon: '',
      id: 0,
      team: 0,
    }),
    [messages.clickTheCountryYouThinkWillBe]
  );

  const addInitialItem = (place: number) => {
    return {
      name: '',
      place: place + 2,
    };
  };

  let array = useMemo(() => [clickItem], [clickItem]);

  const activeStage = championship.stages.find(
    (entity) => entity.finished === 'no' || entity.finished === 'yes'
  );

  const activeStageIndex = championship.stages.findIndex(
    (entity) => entity.finished === 'no' || entity.finished === 'yes'
  );

  const [selecetedTab, setSelectedTab] = useState(activeStageIndex);
  const [isShowSuccess, setIsShowSuccess] = useState(false);

  const userStagesBet =
    userPredictions && (Object.keys(userPredictions) as StagesE[]);

  const reducePredictionStages = () =>
    championship.stages.reduce((stages, stageObject) => {
      const stage = stageObject.stage;
      const predictionStages = userPredictions[stage];
      const isPredictionStage =
        predictionStages || stage !== 'stage_1' ? array.slice(1) : array;

      const groupsObject = stageObject.groups.reduce((groups, groupsObject) => {
        const group = groupsObject.group_name;

        const arr = predictionStages
          ? predictionStages[group].map((entity) => {
              const teamId = entity.team;
              const generalTeam = findTeamFromGroups(
                stageObject?.groups,
                group as GroupsE,
                teamId
              );

              return {
                name: generalTeam?.name,
                place: entity.place,
                icon: generalTeam?.icon,
                id: teamId,
              };
            })
          : [
              ...new Array(
                groupsObject.teams ? groupsObject.teams.length - 1 : 3
              ),
            ].fill((_: number, index: number) => addInitialItem(index));

        return {
          ...groups,
          [group]: isPredictionStage.concat(arr),
        };
      }, {});

      return {
        ...stages,
        [stage]: {
          ...groupsObject,
        },
      };
    }, {} as SelectedTeamsI);

  const [team, setTeam] = useState<SelectedTeamsI>(reducePredictionStages);

  const stage = championship.stages[selecetedTab].stage;

  const groupKeys = Object.keys(team[stage]) as GroupsE[];

  const isDisabledSubmit = groupKeys.some((entity) => {
    return !team[stage][entity].every((entity: TeamI) => entity.id);
  });

  const handleSetTeam = (group_name: GroupsE, newArray: TeamI[]) => {
    return {
      ...team,
      [stage]: {
        ...team[stage],
        [group_name]: newArray.map((entity, index) => {
          return {
            ...entity,
            place: index + 1,
          };
        }),
      },
    };
  };

  const handleClickFirstStage = (
    groups: GroupI[],
    group_name: GroupsE,
    id: number
  ) => {
    const newTeam = findTeamFromGroups(groups, group_name, id);

    const arr = [...team[stage][group_name]];
    const filled = arr.filter((entity) => entity.id);
    const availableIndex = arr.findIndex((entity) => !entity.id);

    if (newTeam) {
      newTeam.place = availableIndex + 1;

      if (filled.length < arr.length) {
        arr[availableIndex] = newTeam;

        if (filled.length + 1 < arr.length) {
          arr[availableIndex + 1] = array[0];
        }

        setTeam(handleSetTeam(group_name, arr));
      }
    }
  };

  const handleClick = (groups: GroupI[], group_name: GroupsE, id: number) => {
    const newTeam = findTeamFromGroups(groups, group_name, id);
    const oldTeam = findTeamFromGroupsSecondPlace(groups, group_name, id);

    const arr = [...team[stage][group_name]];

    if (newTeam && oldTeam) {
      newTeam.place = 1;
      oldTeam.place = 2;
      arr[0] = newTeam;
      arr[1] = oldTeam;

      setTeam(handleSetTeam(group_name, arr));
    }
  };

  const onSubmit = async (values: SelectedValuesI) => {
    const valuesKeys = Object.keys(values) as GroupsE[];
    const object = valuesKeys.reduce((prevGroup, nextGroup) => {
      return {
        ...prevGroup,
        [nextGroup]: values[nextGroup].map((entity: TeamI) => {
          return {
            place: entity.place,
            id: entity.id,
          };
        }),
      };
    }, {} as SelectedValuesI);

    const response = await fetch(
      championshipUserPrediction,
      getFetchOptions<BetsI>({
        body: {
          ref: championship.slug,
          [stage]: { ...object },
        },
      })
    );

    let json = await response.json();

    if (json.status === 'error') {
      console.error('Prediction error', json.data);
    } else {
      getUserPredictions();
      setIsShowSuccess(true);
      setTimeout(() => {
        setIsShowSuccess(false);
      }, 3500);
    }
  };

  const prevUserPredictions = usePrevious(userPredictions);

  useEffect(() => {
    if (
      JSON.stringify(userPredictions) !== JSON.stringify(prevUserPredictions) &&
      !isEmpty(userPredictions)
    ) {
      setTeam(reducePredictionStages);
    }
  }, [userPredictions, prevUserPredictions]);

  useEffect(() => {
    if (user.id) {
      getUserPredictions();
    }
  }, [user, getUserPredictions]);

  return (
    <div className={styles.root}>
      <Tabs
        className={styles.tabs}
        isPrediction
        selectedTab={selecetedTab}
        setSelectedTab={setSelectedTab}
      >
        {championship.stages?.map(({ stage, stage_name, groups }, index) => {
          const stagesInfo = championship.stages_info[index];
          const dateFrom = convertDateString(stagesInfo?.date_from);
          const dateTo = convertDateString(stagesInfo?.date_to);
          const date = convertDateString(stagesInfo?.date_to, true);

          return (
            <Tab
              key={stage}
              title={stagesInfo.label}
              finished={
                activeStage?.stage === stage ||
                (user.id && userStagesBet && userStagesBet.includes(stage))
              }
              className={styles.tab}
              dateFrom={dateFrom}
              dateTo={dateTo}
            >
              <Header
                messages={messages}
                stageName={stage_name}
                username={user.username}
                date={date}
                showLoginPopupFunc={showLoginPopupFunc}
                showRegisterPopupFunc={showRegisterPopupFunc}
              />
              {stage === 'stage_1' ? (
                <GroupsFirstStage
                  stage={stage}
                  groups={groups}
                  team={team}
                  messages={messages}
                  setTeam={setTeam}
                  handleSetTeam={handleSetTeam}
                  handleClick={handleClickFirstStage}
                />
              ) : (
                <Groups
                  stage={stage}
                  groups={groups}
                  team={team}
                  handleClick={handleClick}
                />
              )}

              <div className={styles.wrapperButton}>
                {!userPredictions[stage] ? (
                  <Button
                    type="button"
                    disabled={!user.username || isDisabledSubmit}
                    className={styles.btnPrediction}
                    onClick={() => onSubmit(team[stage])}
                  >
                    {messages.makePrediction}
                  </Button>
                ) : (
                  <Link
                    className={styles.shareLink}
                    href={`/${Sections.worldCup2022}/${Sections.prediction}/${user.id}/`}
                  >
                    <div
                      className={clsx(styles.btnPrediction, styles.btnShare)}
                    >
                      <ArrowShare />
                      <span className={styles.textBtnShare}>
                        {messages.sharePrediction}
                      </span>
                    </div>
                  </Link>
                )}
              </div>

              <div className={styles.wrapperLinkView}>
                <a href="campaign-prizes/" className={styles.linkView}>
                  {messages.viewWinners}
                </a>
              </div>

              {isShowSuccess && (
                <div className={styles.successModal}>
                  {messages.yourPredictionIsAccepted}
                </div>
              )}
            </Tab>
          );
        })}
      </Tabs>
      <Popups
        showLoginPopup={showLoginPopup}
        showRegisterPopup={showRegisterPopup}
        showForgotPopup={showForgotPopup}
        showLoginPopupFunc={showLoginPopupFunc}
        closeLoginPopupFunc={closeLoginPopupFunc}
        showRegisterPopupFunc={showRegisterPopupFunc}
        closeRegisterPopupFunc={closeRegisterPopupFunc}
        showForgotPopupFunc={showForgotPopupFunc}
        closeForgotPopupFunc={closeForgotPopupFunc}
      />
    </div>
  );
};

export default PredictionGame;
