import clsx from 'clsx';
import Image from 'next/image';

import { Groups as GroupsE, Stages } from 'enums/prediction';

import {
  Group as GroupI,
  SelectedTeams as SelectedTeamsI,
} from 'interfaces/championship';

import Check from 'icons/Check';
import Hexagon from 'icons/Hexagon';

import styles from './styles.module.scss';

interface Props {
  stage: Stages;
  groups: GroupI[];
  team: SelectedTeamsI;
  handleClick: (groups: GroupI[], group_name: GroupsE, id: number) => void;
}

const Groups = ({ stage, groups, team, handleClick }: Props) => {
  return (
    <>
      {groups && (
        <div
          className={clsx(
            styles.wrapperGroups,
            stage === ('stage_3' && 'stage_4') && styles.wrapperGroupsHalf,
            stage === 'stage_5' && styles.wrapperGroupsQuarter
          )}
        >
          {!!groups?.length &&
            groups.map(({ group_name, teams }) => {
              return (
                <>
                  {teams && (
                    <div key={group_name} className={styles.group}>
                      <div className={styles.wrapperCountries}>
                        <div className={styles.wrapperHexagon}>
                          <Hexagon />
                          <span className={styles.hexagonText}>VS</span>
                        </div>
                        <div className={styles.greyLine} />
                        {teams?.map(({ icon, id, name }) => {
                          return (
                            <div
                              key={id}
                              onClick={() =>
                                handleClick(groups, group_name, id)
                              }
                              className={clsx(
                                styles.wrapperCountry,
                                team[stage][group_name][0].id === id &&
                                  styles.selectedCountry
                              )}
                            >
                              {team[stage][group_name][0].id === id && (
                                <Check className={styles.iconCheck} />
                              )}
                              {icon && (
                                <Image
                                  alt="altText"
                                  src={icon}
                                  width="61"
                                  height="40"
                                />
                              )}
                              <span className={styles.nameCountry}>{name}</span>
                            </div>
                          );
                        })}
                      </div>
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

export default Groups;
