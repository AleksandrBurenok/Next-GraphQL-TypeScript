import { useCallback, useEffect, useState, useMemo } from 'react';

import { getWatchFootball } from 'queries/watchFootball';

import { WatchFootball as WatchFootballI } from 'interfaces/watchFootball';

const memoized: { [key: string]: WatchFootballI[] } = {};

const useWatchTableData = () => {
  const [watchFootball, setWatchFootball] = useState<WatchFootballI[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const keyParam = useMemo(() => '', []);

  const getData = useCallback(() => {
    setIsLoading(true);
    getWatchFootball().then((data) => {
      memoized[keyParam] = data.data;
      setWatchFootball(data.data);
      setIsLoading(false);
    });
  }, [keyParam]);

  useEffect(() => {
    if (memoized[keyParam]) {
      setWatchFootball(memoized[keyParam]);
    } else {
      getData();
    }
  }, [getData, keyParam]);

  return {
    isLoading,
    watchFootball,
  };
};

export default useWatchTableData;
