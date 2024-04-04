import { useIntl } from 'react-intl';
import clsx from 'clsx';
import Image from 'next/image';

import FinalPrizeIconLeft from 'icons/FinalPrizeIconLeft';
import FinalPrizeIconRight from 'icons/FinalPrizeIconRight';

import { Groups as GroupsE } from 'enums/prediction';
import { Sections } from 'enums/path';

import {
  SelectedTeams as SelectedTeamsI,
  Championship as ChampionshipI,
} from 'interfaces/championship';

import Link from 'components/Link';

import { findTeamFromGroups } from '../helpers';

import styles from './styles.module.scss';

interface Props {
  championship: ChampionshipI;
  userPredictions: SelectedTeamsI;
}

const Share = ({ championship, userPredictions }: Props) => {
  const { messages } = useIntl();

  const team: SelectedTeamsI = championship.stages.reduce(
    (stages, stageObject) => {
      const stage = stageObject && stageObject.stage;
      const predictionStages = userPredictions && userPredictions[stage];

      const groupsObject = stageObject.groups.reduce((groups, groupsObject) => {
        const group = groupsObject.group_name;

        const arr =
          predictionStages &&
          predictionStages[group].map((entity) => {
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
          });

        return {
          ...groups,
          [group]: arr,
        };
      }, {});

      return {
        ...stages,
        [stage]: {
          ...groupsObject,
        },
      };
    },
    {} as SelectedTeamsI
  );

  return (
    <div className={styles.root}>
      {championship.stages?.slice(0, 1).map(({ stage, groups }, index) => {
        const stagesInfo = championship.stages_info[index];

        return (
          <div className={styles.stage} key={index}>
            <h2 className={styles.stageTitle}>{stagesInfo.label}</h2>
            <div className={styles.wrapperGroups}>
              {!!groups?.length &&
                groups.map(({ group_name }) => {
                  return (
                    <div key={group_name} className={styles.group}>
                      <div className={styles.wrapperPositions}>
                        {team[stage][group_name] &&
                          team[stage][group_name].map(
                            ({ name, place, icon }) => {
                              return (
                                <div
                                  className={styles.teamNameWrapper}
                                  key={name}
                                >
                                  <span className={styles.selectedPlace}>
                                    {place}
                                  </span>
                                  {icon && (
                                    <div className={styles.flagWrapper}>
                                      <Image
                                        alt="altText"
                                        src={icon}
                                        width="18"
                                        height="12"
                                      />
                                    </div>
                                  )}
                                  <span className={styles.selectedCountryName}>
                                    {name.slice(0, 3)}
                                  </span>
                                </div>
                              );
                            }
                          )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}

      {championship.stages?.slice(1, 2).map(({ stage, groups }, index) => {
        const stagesInfo = championship.stages_info[index];

        return (
          <div className={styles.stage} key={index}>
            <h2 className={styles.stageTitle}>{stagesInfo.label}</h2>
            <div
              className={clsx(
                styles.wrapperGroups,
                styles.wrapperGroupsNextStages
              )}
            >
              {!!groups?.length &&
                groups.map(({ group_name }) => {
                  return (
                    <div
                      key={group_name}
                      className={clsx(styles.group, styles.groupNextStages)}
                    >
                      <div
                        className={clsx(
                          styles.wrapperPositions,
                          styles.wrapperPositionsNextStages
                        )}
                      >
                        {team[stage][group_name] &&
                          team[stage][group_name]
                            .slice(0, 1)
                            .map(({ name, place, icon }) => {
                              return (
                                <div
                                  className={clsx(
                                    styles.teamNameWrapper,
                                    styles.teamNameWrapperNextStages
                                  )}
                                  key={name}
                                >
                                  {icon && (
                                    <div className={styles.flagWrapper}>
                                      <Image
                                        alt="altText"
                                        src={icon}
                                        width="18"
                                        height="12"
                                      />
                                    </div>
                                  )}
                                  <span className={styles.selectedCountryName}>
                                    {name.slice(0, 3)}
                                  </span>
                                </div>
                              );
                            })}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}

      <div className={styles.wrapperQuarterSemiFinals}>
        {championship.stages?.slice(2, 4).map(({ stage, groups }, index) => {
          const stagesInfo = championship.stages_info[index];

          return (
            <div className={styles.stage} key={index}>
              <h2 className={styles.stageTitle}>{stagesInfo.label}</h2>
              <div
                className={clsx(
                  styles.wrapperGroups,
                  styles.wrapperGroupsNextStages
                )}
              >
                {!!groups?.length &&
                  groups.map(({ group_name }) => {
                    return (
                      <div
                        key={group_name}
                        className={clsx(styles.group, styles.groupNextStages)}
                      >
                        <div
                          className={clsx(
                            styles.wrapperPositions,
                            styles.wrapperPositionsNextStages
                          )}
                        >
                          {team[stage][group_name] &&
                            team[stage][group_name]
                              .slice(0, 1)
                              .map(({ name, place, icon }) => {
                                return (
                                  <div
                                    className={clsx(
                                      styles.teamNameWrapper,
                                      styles.teamNameWrapperNextStages
                                    )}
                                    key={name}
                                  >
                                    {icon && (
                                      <div className={styles.flagWrapper}>
                                        <Image
                                          alt="altText"
                                          src={icon}
                                          width="18"
                                          height="12"
                                        />
                                      </div>
                                    )}
                                    <span
                                      className={styles.selectedCountryName}
                                    >
                                      {name.slice(0, 3)}
                                    </span>
                                  </div>
                                );
                              })}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>

      {championship.stages?.slice(-1).map(({ stage, groups }, index) => {
        const stagesInfo = championship.stages_info[index];

        return (
          <div className={clsx(styles.stage, styles.stageFinal)} key={index}>
            <h2 className={styles.stageTitle}>{stagesInfo.label}</h2>
            <div
              className={clsx(
                styles.wrapperGroups,
                styles.wrapperGroupsNextStages
              )}
            >
              {!!groups?.length &&
                groups.map(({ group_name }) => {
                  return (
                    <div
                      key={group_name}
                      className={clsx(styles.group, styles.groupNextStages)}
                    >
                      <div
                        className={clsx(
                          styles.wrapperPositions,
                          styles.wrapperPositionsNextStages
                        )}
                      >
                        {team[stage][group_name] &&
                          team[stage][group_name]
                            .slice(0, 1)
                            .map(({ name, icon }) => {
                              return (
                                <div
                                  className={clsx(
                                    styles.teamNameWrapper,
                                    styles.teamNameWrapperNextStages
                                  )}
                                  key={name}
                                >
                                  {icon && (
                                    <div className={styles.flagWrapper}>
                                      <Image
                                        alt="altText"
                                        src={icon}
                                        width="61"
                                        height="40"
                                      />
                                    </div>
                                  )}
                                  <span className={styles.selectedCountryName}>
                                    {name || 'Portugal'}
                                  </span>
                                </div>
                              );
                            })}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}

      <div className={styles.wrapperButton}>
        <p className={styles.bottomText}>
          {messages.makeYourPredictionsAndYouMightEvenWinPrizes}
        </p>
        <Link
          className={styles.makePredictionLink}
          href={`/${Sections.worldCup2022}/`}
        >
          {messages.makePrediction}
        </Link>
      </div>
      <FinalPrizeIconLeft className={styles.finalPrizeIconLeft} />
      <FinalPrizeIconRight className={styles.finalPrizeIconRight} />
    </div>
  );
};

export default Share;
