import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';

import { League as LeagueI } from 'interfaces/league';

import { Sections } from 'enums/path';
import { Keys } from 'enums/ranking';

import { ALL } from 'constants/selectList';

import Preloader from 'icons/Preloader';

import { Select } from 'components/Fields';
import Toggler from 'components/Shared/Toggler';

import { useThailandTableData } from '../hooks';
import Dates from '../Fixtures/Dates';
import Teams from '../Reusable/Teams';
import Leagues from '../Reusable/Leagues';
import LeagueHeader from '../Reusable/Leagues/Header';

import styles from './styles.module.scss';

interface Props {
  priorityLeagues: LeagueI[];
  isMobile?: boolean;
  title: string;
}

const ThailandFixtures = ({
  priorityLeagues,
  isMobile = false,
  title,
}: Props) => {
  const { messages } = useIntl();
  const { register, watch, setValue } = useForm();

  const {
    leaguesSelectList,
    isLoading,
    liveScore,
    date,
    setDate,
    leagueParam,
  } = useThailandTableData({
    priorityLeagues,
    watch,
    section: Sections.thaiFixtures,
  });

  useEffect(() => {
    setValue(Keys.league, leagueParam);
  }, [leagueParam]);

  return (
    <>
      <div className={styles.root}>
        <div className={styles.header}>
          <h1 className="red-left-flag">{title}</h1>

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

        <Dates
          setDate={setDate}
          date={date}
          name={Keys.pickerDate}
          setValue={setValue}
          watch={watch}
          isMobile={isMobile}
        />

        {isMobile && (
          <Toggler header={<LeagueHeader />}>
            <Leagues section={Sections.thaiFixtures} list={leaguesSelectList} />
          </Toggler>
        )}

        {isLoading && (
          <div className={styles.center}>
            <Preloader />
          </div>
        )}

        {!liveScore.length && !isLoading && (
          <div className={styles.center}>{messages.noFootballGames}</div>
        )}

        {!!liveScore.length && (
          <Teams livescores={liveScore} isFixture isMobile={isMobile} />
        )}
      </div>
    </>
  );
};

export default ThailandFixtures;
