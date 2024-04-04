import Ball from 'icons/Ball';
import Penalty from 'icons/Penalty';
import Substitution from 'icons/Substitution';

import styles from './styles.module.scss';

export const eventTypes = {
  goal: <Ball className={styles.iconGoal} width={20} height={20} />,
  yellowcard: <div className={styles.yellowCard} />,
  redcard: <div className={styles.redCard} />,
  substitution: <Substitution width={20} height={20} />,
  penalty: <Penalty width={20} height={20} />,
};
