import { useState, useCallback, useEffect } from 'react';

import { bannerAdsUserClick } from 'config/api';
import { getUserIp } from 'config/ip';

import { getFetchOptions } from 'helpers/fetch';

const useAdsBannerReport = () => {
  const [ipAdress, setIpAddress] = useState<string>('');

  const onSubmit = async (ckBannerParam: string) => {
    await fetch(
      bannerAdsUserClick,
      getFetchOptions({
        body: {
          redirect_from: ckBannerParam,
          ip: ipAdress,
        },
      })
    );
  };

  const getUserIpAddress = useCallback(async () => {
    const response = await fetch(getUserIp, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      let json = await response.json();

      if ('ip' in json) {
        setIpAddress(json.ip);
      }
    } else {
      console.error(`Could not fetch ip ${response.status}`);
    }
  }, []);

  useEffect(() => {
    getUserIpAddress();
  });

  return {
    onSubmit,
  };
};

export default useAdsBannerReport;
