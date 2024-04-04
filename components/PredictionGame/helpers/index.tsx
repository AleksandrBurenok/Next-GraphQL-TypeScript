import { Groups as GroupsE } from 'enums/prediction';

import { Group as GroupI } from 'interfaces/championship';

export const findTeamFromGroups = (
  groups: GroupI[],
  group_name: GroupsE,
  id: number
) => {
  const groupt = groups.find((group) => group.group_name === group_name);
  return groupt && groupt.teams.find((team) => team.id === id);
};

export const findTeamFromGroupsSecondPlace = (
  groups: GroupI[],
  group_name: GroupsE,
  id: number
) => {
  const groupt = groups.find((group) => group.group_name === group_name);
  return groupt && groupt.teams.find((team) => team.id !== id);
};
