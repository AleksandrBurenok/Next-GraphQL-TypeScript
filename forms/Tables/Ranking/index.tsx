import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { League as LeagueI } from 'interfaces/league';

import { Sections } from 'enums/path';
import { Keys } from 'enums/ranking';

import { ALL } from 'constants/selectList';

import Preloader from 'icons/Preloader';

import { Select } from 'components/Fields';
import Toggler from 'components/Shared/Toggler';

import { useRankingData } from '../hooks';
import Teams from './Teams';
import Leagues from '../Reusable/Leagues';
import LeagueHeader from '../Reusable/Leagues/Header';

import styles from './styles.module.scss';

interface Props {
  priorityLeagues: LeagueI[];
  isMobile?: boolean;
}

const Ranking = ({ priorityLeagues, isMobile = false }: Props) => {
  const { messages } = useIntl();

  const { register, watch, setValue } = useForm();

  const { leaguesSelectList, isLoading, ranking, leagueParam } = useRankingData(
    {
      priorityLeagues,
      watch,
      section: Sections.ranking,
    }
  );

  useEffect(() => {
    setValue(Keys.league, leagueParam);
  }, [leagueParam]);

  return (
    <>
      <div className={styles.root}>
        <div className={styles.header}>
          <h1 className="red-left-flag">{messages.todaysTables}</h1>

          {!isMobile && (
            <Select
              register={register}
              name={Keys.league}
              list={leaguesSelectList}
              className={styles.select}
              defaultValue={leagueParam ? (leagueParam as string) : ALL}
              setValue={setValue}
              watch={watch}
            />
          )}
        </div>

        {isMobile && (
          <Toggler header={<LeagueHeader />}>
            <Leagues section={Sections.ranking} list={leaguesSelectList} />
          </Toggler>
        )}

        {isLoading && (
          <div className={styles.center}>
            <Preloader />
          </div>
        )}

        {!ranking.length && !isLoading && (
          <div className={styles.center}>{messages.noFootballGames}</div>
        )}

        {!!ranking.length && <Teams ranking={ranking} />}
      </div>
    </>
  );
};

export default Ranking;
