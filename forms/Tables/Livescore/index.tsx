import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { League as LeagueI } from 'interfaces/league';
import { Post as PostI } from 'interfaces/post';

import { Sections } from 'enums/path';
import { Keys } from 'enums/ranking';

import { ALL } from 'constants/selectList';

import Preloader from 'icons/Preloader';

import { Select } from 'components/Fields';
import Toggler from 'components/Shared/Toggler';

import { useLivescoreData } from '../hooks';
import Dates from './Dates';
import Teams from '../Reusable/Teams';
import Leagues from '../Reusable/Leagues';
import LeagueHeader from '../Reusable/Leagues/Header';

import styles from './styles.module.scss';

interface Props {
  priorityLeagues: LeagueI[];
  countries: { node: PostI }[];
  isMobile?: boolean;
  isCountries?: boolean;
}

const Livescore = ({
  priorityLeagues,
  isMobile = false,
  countries,
  isCountries = false,
}: Props) => {
  const { messages } = useIntl();
  const { register, watch, setValue } = useForm();

  const {
    leaguesSelectList,
    countriesSelectList,
    isLoading,
    liveScore,
    date,
    setDate,
    leagueParam,
  } = useLivescoreData({
    priorityLeagues,
    countries,
    watch,
    section: Sections.livescore,
    isCountries,
  });

  const leaguesSlugs = priorityLeagues.map((entity) => entity.slug);
  const countriesSlugs = countries.map((entity) => entity.node.slug);

  useEffect(() => {
    setValue(isCountries ? Keys.country : Keys.league, leagueParam);
  }, [leagueParam, isCountries]);

  return (
    <>
      <div className={styles.root}>
        <div className={styles.header}>
          <h1 className="red-left-flag">{messages.todaysLivescore}</h1>

          {!isMobile && (
            <div className={styles.wrapperDropdowns}>
              <div className={styles.wrapperDropdown}>
                <Select
                  register={register}
                  name={Keys.country}
                  list={countriesSelectList}
                  className={styles.select}
                  defaultValue={
                    countriesSlugs.includes(leagueParam as string)
                      ? (leagueParam as string)
                      : ALL
                  }
                  setValue={setValue}
                  watch={watch}
                />
              </div>
              <div className={styles.wrapperDropdown}>
                <Select
                  register={register}
                  name={Keys.league}
                  list={leaguesSelectList}
                  className={styles.select}
                  defaultValue={
                    leaguesSlugs.includes(leagueParam as string)
                      ? (leagueParam as string)
                      : ALL
                  }
                  setValue={setValue}
                  watch={watch}
                />
              </div>
            </div>
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
          <>
            <Toggler header={<LeagueHeader />}>
              <Leagues
                section={Sections.livescore}
                list={leaguesSelectList}
                isLivescore
              />
            </Toggler>
            <Toggler header={<LeagueHeader isCountries />}>
              <Leagues
                section={Sections.livescore}
                list={countriesSelectList}
                isLivescore
              />
            </Toggler>
          </>
        )}

        {isLoading && (
          <div className={styles.center}>
            <Preloader />
          </div>
        )}

        {!liveScore.length && !isLoading && (
          <div className={styles.center}>{messages.noFootballGames}</div>
        )}

        {!!liveScore.length && !isLoading && (
          <Teams livescores={liveScore} isMobile={isMobile} />
        )}
      </div>
    </>
  );
};

export default Livescore;
