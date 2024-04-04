import { useState } from 'react';

import { useInterval } from 'hooks';

import { Banner as BannerI } from 'interfaces/banners';

import { handleChangeBanners } from 'helpers/banners';

const useRandom = (banners: BannerI[], isGoogleAd = false) => {
  const [currentIndexLeft, setCurrentIndexLeft] = useState(0);
  const [currentIndexRight, setCurrentIndexRight] = useState(0);

  const leftPartBanners = isGoogleAd ? banners : banners.slice(0, 3);
  const rightPartBanners = banners.slice(3);

  useInterval(() => {
    handleChangeBanners(
      currentIndexLeft,
      currentIndexRight,
      setCurrentIndexLeft,
      setCurrentIndexRight,
      leftPartBanners,
      rightPartBanners
    );
  }, 5000);

  return {
    currentIndexLeft,
    currentIndexRight,
    leftPartBanners,
    rightPartBanners,
  };
};

export default useRandom;
