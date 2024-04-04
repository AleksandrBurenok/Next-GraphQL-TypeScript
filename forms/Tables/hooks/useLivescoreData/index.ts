import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { UseFormWatch } from 'react-hook-form';

import { getLiveScore } from 'queries/livescore';

import { Sections } from 'enums/path';
import { Keys } from 'enums/ranking';

import { ALL } from 'constants/selectList';

import { Livescore as LivescoreI } from 'interfaces/livescore';
import { League as LeagueI } from 'interfaces/league';
import { Post as PostI } from 'interfaces/post';

import { getDate } from 'helpers/date';

import { usePrevious } from 'hooks';

const todayDate = new Date();

const memoized: { [key: string]: LivescoreI[] } = {};

interface Props {
  priorityLeagues: LeagueI[];
  countries: { node: PostI }[];
  watch: UseFormWatch<any>;
  section: Sections;
  isCountries?: boolean;
}

const useLivescoreData = ({
  priorityLeagues,
  countries,
  watch,
  section,
  isCountries = false,
}: Props) => {
  const [liveScore, setLiveScore] = useState<LivescoreI[]>([]);
  const [date, setDate] = useState<string>(getDate(todayDate));
  const [isLoading, setIsLoading] = useState(false);

  const { query, push } = useRouter();

  const [league, country, pickerDate] = watch([
    Keys.league,
    Keys.country,
    Keys.pickerDate,
  ]);

  const prevDate = usePrevious(date);
  const prevPickerDate = usePrevious(pickerDate);
  const prevLeague = usePrevious(league);
  const prevCountry = usePrevious(country);

  const leagueId = useMemo(() => {
    return priorityLeagues.find((entity) => entity.slug === query.league)?.id;
  }, [priorityLeagues, query.league]);

  const countryId = useMemo(() => {
    return countries.find((entity) => entity.node.slug === query.league)?.node
      .pageFields.leagues;
  }, [countries, query.league]);

  const params = useMemo(() => {
    return {
      date,
      ...(!isCountries && leagueId
        ? { league: leagueId }
        : isCountries && countryId && { league: countryId }),
    };
  }, [date, leagueId, countryId, isCountries]);

  const { messages } = useIntl();

  const keyParam = useMemo(
    () => (query.league ? `${query.league}.${date}` : date),
    [query.league, date]
  );

  const getData = useCallback(() => {
    setIsLoading(true);
    getLiveScore(params).then((data) => {
      memoized[keyParam] = data;
      setLiveScore(data);
      setIsLoading(false);
    });
  }, [params, keyParam]);

  const leaguesSelectList = useMemo(() => {
    return [{ name: messages.selectLeague, value: ALL }].concat(
      priorityLeagues.map((entity) => {
        return {
          name: entity.name,
          value: entity.slug,
        };
      })
    );
  }, [priorityLeagues, messages.selectLeague]);

  const countriesSelectList = useMemo(() => {
    return [{ name: messages.selectCountry, value: ALL }].concat(
      countries.map((entity) => {
        return {
          name: entity.node.pageFields.shortTitle,
          value: entity.node.slug,
        };
      })
    );
  }, [countries, messages.selectCountry]);

  useEffect(() => {
    if (pickerDate && prevPickerDate !== pickerDate) {
      setDate(getDate(pickerDate));
    }
  }, [pickerDate, prevPickerDate]);

  useEffect(() => {
    if (league && prevLeague && prevLeague !== league) {
      const slug = priorityLeagues.find(
        (entity) => entity.slug === league
      )?.slug;

      if (slug) {
        push(`/${section}/${slug}`);
      } else {
        push(`/${section}/`);
      }
    }
  }, [league, prevLeague, push, section, priorityLeagues]);

  useEffect(() => {
    if (country && prevCountry && prevCountry !== country) {
      const slug = countries.find((entity) => entity.node.slug === country)
        ?.node.slug;

      if (slug) {
        push(`/${section}/${slug}`);
      } else {
        push(`/${section}/`);
      }
    }
  }, [country, prevCountry, push, section, countries]);

  useEffect(() => {
    if (date !== prevDate) {
      if (memoized[keyParam]) {
        setLiveScore(memoized[keyParam]);
      } else {
        getData();
      }
    } else {
      getData();
    }
  }, [date, prevDate, getData, keyParam]);

  return {
    leaguesSelectList,
    countriesSelectList,
    isLoading,
    liveScore,
    date,
    setDate,
    leagueParam: query.league || ALL,
  };
};

export default useLivescoreData;
