import { useEffect, useState, useCallback } from 'react';

import { useAuth } from 'context/auth';

import { getFetchOptions } from 'helpers/fetch';

import { getChampionshipUserPrediction } from 'config/api';

import {
  GetBets as GetBetsI,
  SelectedTeams as SelectedTeamsI,
} from 'interfaces/championship';

const useUserPredictions = (slug: string) => {
  const user = useAuth();

  const [userPredictions, setUserPredictions] = useState<SelectedTeamsI>(
    {} as SelectedTeamsI
  );

  const getUserPredictions = useCallback(async () => {
    const response = await fetch(
      getChampionshipUserPrediction,
      getFetchOptions<GetBetsI>({
        body: {
          ref: slug,
          user: user.id,
        },
      })
    );

    let json = await response.json();

    if (json) {
      setUserPredictions(json);
    }
  }, [user, slug]);

  useEffect(() => {
    if (user.id) {
      getUserPredictions();
    }
  }, [user, getUserPredictions]);

  return {
    userPredictions,
  };
};

export default useUserPredictions;
