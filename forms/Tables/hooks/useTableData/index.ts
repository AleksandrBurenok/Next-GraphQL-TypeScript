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

import { getDate } from 'helpers/date';

import { usePrevious } from 'hooks';

const todayDate = new Date();

const memoized: { [key: string]: LivescoreI[] } = {};

interface Props {
  priorityLeagues: LeagueI[];
  watch: UseFormWatch<any>;
  section: Sections;
}

const useTableData = ({ priorityLeagues, watch, section }: Props) => {
  const [liveScore, setLiveScore] = useState<LivescoreI[]>([]);
  const [date, setDate] = useState<string>(getDate(todayDate));
  const [isLoading, setIsLoading] = useState(false);

  const { query, push } = useRouter();

  const [league, pickerDate] = watch([Keys.league, Keys.pickerDate]);

  const prevDate = usePrevious(date);
  const prevPickerDate = usePrevious(pickerDate);
  const prevLeague = usePrevious(league);

  const leagueId = useMemo(() => {
    return priorityLeagues.find((entity) => entity.slug === query.league)?.id;
  }, [priorityLeagues, query.league]);

  const params = useMemo(() => {
    return {
      date,
      ...(leagueId && { league: leagueId }),
    };
  }, [date, leagueId]);

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
        push(`/${Sections.football}/${section}/${slug}`);
      } else {
        push(`/${Sections.football}/${section}/`);
      }
    }
  }, [league, prevLeague, push, priorityLeagues, section]);

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

  return {
    leaguesSelectList,
    isLoading,
    liveScore,
    date,
    setDate,
    leagueParam: query.league || ALL,
  };
};

export default useTableData;
