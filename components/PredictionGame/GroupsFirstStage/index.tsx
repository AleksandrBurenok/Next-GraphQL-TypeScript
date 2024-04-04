import clsx from 'clsx';
import Image from 'next/image';
import { List, arrayMove, RenderItemParams } from 'react-movable';

import { Groups as GroupsE, Stages } from 'enums/prediction';

import {
  Team as TeamI,
  Group as GroupI,
  SelectedTeams as SelectedTeamsI,
} from 'interfaces/championship';
import { Messages } from 'interfaces/intl';

import Dots from 'icons/Dots';

import styles from './styles.module.scss';

interface Props {
  stage: Stages;
  groups: GroupI[];
  handleClick: (groups: GroupI[], group_name: GroupsE, id: number) => void;
  messages: Messages;
  handleSetTeam: (group_name: GroupsE, newArray: TeamI[]) => SelectedTeamsI;
  setTeam: (selectedTeams: SelectedTeamsI) => void;
  team: SelectedTeamsI;
}

const GroupsFirstStage = ({
  stage,
  groups,
  team,
  messages,
  setTeam,
  handleSetTeam,
  handleClick,
}: Props) => {
  return (
    <>
      {groups && (
        <div className={styles.wrapperGroups}>
          {!!groups?.length &&
            groups.map(({ group_name, teams }) => {
              return (
                <>
                  {teams && (
                    <div key={group_name} className={styles.group}>
                      <div className={styles.wrapperCountries}>
                        {teams?.map(({ icon, id, name }) => {
                          return (
                            <div
                              key={id}
                              onClick={() =>
                                handleClick(groups, group_name, id)
                              }
                              className={clsx(
                                styles.wrapperCountry,
                                team[stage][group_name].find(
                                  (item: TeamI) => item.id === id
                                ) && styles.selectedCountry
                              )}
                            >
                              {icon && (
                                <Image
                                  alt="altText"
                                  src={icon}
                                  width="18"
                                  height="12"
                                />
                              )}
                              <span className={styles.nameCountry}>
                                {name.slice(0, 3)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <List
                        values={team[stage][group_name]}
                        transitionDuration={50}
                        onChange={({ oldIndex, newIndex }) =>
                          setTeam(
                            handleSetTeam(
                              group_name,
                              arrayMove(
                                team[stage][group_name],
                                oldIndex,
                                newIndex
                              )
                            )
                          )
                        }
                        renderList={({ children, props }) => {
                          return (
                            <div className={styles.wrapperPositions} {...props}>
                              {children}
                            </div>
                          );
                        }}
                        renderItem={({
                          value,
                          props,
                          index = 0,
                          isDragged,
                        }: RenderItemParams<{
                          icon: string;
                          name: string;
                        }>) => {
                          return (
                            <div
                              className={clsx(
                                styles.teamNameWrapper,
                                isDragged && styles.teamNameWrapperDragged
                              )}
                              {...props}
                            >
                              <div className={styles.teamName}>
                                <div className={styles.selectedTeamWrapper}>
                                  <span className={styles.selectedPlace}>
                                    {index + 1}
                                  </span>
                                  {value.icon && (
                                    <div className={styles.flagWrapper}>
                                      <Image
                                        alt="altText"
                                        src={value.icon}
                                        width="18"
                                        height="12"
                                      />
                                    </div>
                                  )}
                                  <span
                                    className={clsx(
                                      styles.placeholderText,
                                      styles.selectedCountryName
                                    )}
                                  >
                                    {value.name ===
                                    messages.clickTheCountryYouThinkWillBe
                                      ? `${value.name} ${index + 1}`
                                      : value.name}
                                  </span>
                                </div>
                              </div>
                              <Dots
                                data-movable-handle
                                className={clsx(
                                  styles.dots,
                                  team[stage][group_name].filter(
                                    (entity: TeamI) => entity.id
                                  ).length === teams.length &&
                                    isDragged &&
                                    styles.dotsDragged,
                                  team[stage][group_name].filter(
                                    (entity: TeamI) => entity.id
                                  ).length !== teams.length &&
                                    styles.dotsNoDragged
                                )}
                              />
                            </div>
                          );
                        }}
                      />
                    </div>
                  )}
                </>
              );
            })}
        </div>
      )}
    </>
  );
};

export default GroupsFirstStage;
