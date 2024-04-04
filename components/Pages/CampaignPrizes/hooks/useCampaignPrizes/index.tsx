import { useMemo, useState } from 'react';

import { StageWinners as StageWinnersI } from 'interfaces/championship';

const useCampaignPrizes = (stages: StageWinnersI[]) => {
  const [stageName, setStageName] = useState('');

  const openPrizePopup = (name: string) => {
    setStageName(name);
  };

  const closePrizePopup = () => {
    setStageName('');
  };

  const prizeDialog = useMemo(() => !!stageName, [stageName]);

  const stage = useMemo(
    () => stages.find((entity) => entity.stageName === stageName),
    [stages, stageName]
  );

  return {
    openPrizePopup,
    closePrizePopup,
    prizeDialog,
    stage,
  };
};

export default useCampaignPrizes;
