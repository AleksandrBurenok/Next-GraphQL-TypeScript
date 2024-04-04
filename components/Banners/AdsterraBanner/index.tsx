import { useEffect, useRef } from 'react';

interface Props {
  bannerKey: string;
  height: number;
  width: number;
}

const AdsterraBanner = ({ bannerKey, height, width }: Props) => {
  const banner = useRef<HTMLDivElement>(null);

  const atAsyncOptions = {
    key: bannerKey,
    format: 'iframe',
    async: true,
    height: height,
    width: width,
    container: `atContainer-${bannerKey}`,
    params: {},
  };

  useEffect(() => {
    if (banner.current && !banner.current.firstChild && bannerKey) {
      const conf = document.createElement('script');
      conf.innerHTML = `
        if (typeof atAsyncOptions !== 'object') var atAsyncOptions = [];
        atAsyncOptions.push(${JSON.stringify(atAsyncOptions, null, 2)});
      `;
      conf.type = 'text/javascript';

      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.profitabledisplaynetwork.com/${bannerKey}/invoke.js`;
      script.type = 'text/javascript';

      banner.current.append(conf);
      banner.current.append(script);
    }
  }, [bannerKey]);

  return (
    <>
      <div ref={banner} />
      <div id={`atContainer-${bannerKey}`} />
    </>
  );
};

export default AdsterraBanner;
