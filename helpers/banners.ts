import { Banner as BannerI } from 'interfaces/banners';

import { BANNER_URL_CK_PARAM } from 'constants/urls';

export const handleChangeBanners = (
  currentIndexLeft: number,
  currentIndexRight: number,
  setCurrentIndexLeft: (index: number) => void,
  setCurrentIndexRight: (index: number) => void,
  leftPartBanners: BannerI[],
  rightPartBanners: BannerI[]
) => {
  if (
    currentIndexLeft === leftPartBanners.length - 1 &&
    currentIndexRight === rightPartBanners.length - 1
  ) {
    setCurrentIndexLeft(0);
    setCurrentIndexRight(0);
  } else {
    setCurrentIndexLeft(Math.floor(Math.random() * leftPartBanners.length));
    setCurrentIndexRight(Math.floor(Math.random() * rightPartBanners.length));
  }
};

export const getCkBannerParam = (url: string) =>
  url?.replace(BANNER_URL_CK_PARAM, '');
