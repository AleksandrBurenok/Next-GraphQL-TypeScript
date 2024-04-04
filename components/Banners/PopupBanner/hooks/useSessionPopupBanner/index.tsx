import { useEffect, useState } from 'react';

import { Banner as BannerI } from 'interfaces/banners';

const useSessionPopupBanner = (banners: BannerI[]) => {
  const [isShowPopupBanner, setIsShowPopupBanner] = useState(false);

  const closeBannerPopup = () => {
    setIsShowPopupBanner(false);
  };

  useEffect(() => {
    if (!!banners.length && !sessionStorage.getItem('shown-modal')) {
      sessionStorage.setItem('shown-modal', 'true');
      setIsShowPopupBanner(true);
      setTimeout(() => {
        setIsShowPopupBanner(false);
      }, 10000);
    }
  }, [banners.length]);

  return {
    isShowPopupBanner,
    closeBannerPopup,
  };
};

export default useSessionPopupBanner;
