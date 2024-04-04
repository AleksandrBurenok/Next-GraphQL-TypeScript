import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { UseFormWatch } from 'react-hook-form';

import { getRanking } from 'queries/ranking';

import { Sections } from 'enums/path';
import { Keys } from 'enums/ranking';

import { ALL } from 'constants/selectList';

import { Ranking as RankingI } from 'interfaces/ranking';
import { League as LeagueI } from 'interfaces/league';

import { usePrevious } from 'hooks';

const memoized: { [key: string]: RankingI[] } = {};

interface Props {
  priorityLeagues: LeagueI[];
  watch: UseFormWatch<any>;
  section: Sections;
}

const useRankingData = ({ priorityLeagues, watch, section }: Props) => {
  const [ranking, setRanking] = useState<RankingI[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { query, push } = useRouter();

  const league = watch(Keys.league);

  const prevLeague = usePrevious(league);

  const leagueId = useMemo(() => {
    return priorityLeagues.find((entity) => entity.slug === query.league)?.id;
  }, [priorityLeagues, query.league]);

  const params = useMemo(() => {
    return {
      ...(leagueId && { league: leagueId }),
    };
  }, [leagueId]);

  const { messages } = useIntl();

  const keyParam = useMemo(
    () => (query.league || '') as string,
    [query.league]
  );

  const getData = useCallback(() => {
    setIsLoading(true);
    getRanking(params).then((data) => {
      memoized[keyParam] = data;
      setRanking(data);
      setIsLoading(false);
    });
  }, [params, keyParam]);

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
    if (memoized[keyParam]) {
      setRanking(memoized[keyParam]);
    } else {
      getData();
    }
  }, [getData, keyParam]);

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
    ranking,
    leagueParam: query.league || ALL,
  };
};

export default useRankingData;
