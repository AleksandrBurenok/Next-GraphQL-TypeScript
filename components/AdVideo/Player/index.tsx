import { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import 'videojs-contrib-ads';
import clsx from 'clsx';

import { VideoAd as VideoAdI } from 'interfaces/video';

import { Methods as MethodsK } from 'enums/methods';

import { videoConfigUrl } from 'config/api';

import { getFetchOptions } from 'helpers/fetch';

import styles from './styles.module.scss';

interface Props {
  poster: string;
  videoUrl: string;
}

interface AdsOptions {
  timeout: number;
}

interface PlayerExtension {
  ads: (options: AdsOptions) => void;
}

interface AdsObject {
  ads: {
    startLinearAdMode: () => void;
    endLinearAdMode: () => void;
  };
}

const AdVideo = ({ videoUrl, poster }: Props) => {
  const { messages } = useIntl();

  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  const getRandomValue = (arr: VideoAdI[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  useEffect(() => {
    const videoJSOptions = {
      controls: true,
      poster: poster,
      src: videoUrl,
      fluid: true,
      userActions: { hotkeys: true },
      playbackRates: [0.5, 1, 1.5, 2],
    };

    if (videoPlayerRef.current) {
      const skipBtn = document.querySelector('#skip') as HTMLButtonElement;
      const overlay = document.querySelector('#overlay') as HTMLDivElement;
      const player = videojs(
        videoPlayerRef.current,
        videoJSOptions,
        async () => {
          const plr = player as videojs.Player & PlayerExtension & AdsObject;

          plr.src(videoUrl);
          plr.poster(poster);
          plr.ads({
            timeout: 300,
          });
          const response = await fetch(
            videoConfigUrl,
            getFetchOptions({ method: MethodsK.GET })
          );
          if (response.ok) {
            const {
              skip_timeout,
              max_advertisement_duration,
              on_pause_banners,
              preroll_videos,
              postroll_videos,
            } = await response.json();
            plr.on('contentchanged', () => {
              plr.trigger('adsready');
            });
            plr.on('readyforpreroll', () => {
              plr.ads.startLinearAdMode();
              const preroll = getRandomValue(preroll_videos);
              overlay.innerHTML = `<a class="innerLink" href="${preroll.link}" target="_blank" rel="noreferrer noopener" style="display: flex;width: 100%;height: 100%;" />`;
              overlay.style.display = 'block';
              plr.src(preroll.ad);
              plr.one('adplaying', () => {
                plr.trigger('ads-ad-started');
                setTimeout(() => {
                  plr.ads.endLinearAdMode();
                  skipBtn.style.display = 'none';
                  overlay.style.display = 'none';
                }, +max_advertisement_duration * 1000);
              });
              setTimeout(() => {
                skipBtn.style.display = 'block';
              }, +skip_timeout * 1000);
              skipBtn.addEventListener('click', (e) => {
                e.preventDefault();
                plr.ads.endLinearAdMode();
                skipBtn.style.display = 'none';
                overlay.style.display = 'none';
              });
              plr.one('adended', () => {
                plr.ads.endLinearAdMode();
              });
            });
            plr.on('readyforpostroll', () => {
              plr.ads.startLinearAdMode();
              const postroll = getRandomValue(postroll_videos);
              overlay.innerHTML = `<a class="innerLink" href="${postroll.link}" target="_blank" rel="noreferrer noopener" style="display: flex;width: 100%;height: 100%;" />`;
              overlay.style.display = 'block';
              plr.src(postroll.ad);
              plr.one('adplaying', () => {
                plr.trigger('ads-ad-started');
                setTimeout(() => {
                  plr.ads.endLinearAdMode();
                  skipBtn.style.display = 'none';
                  overlay.style.display = 'none';
                }, +max_advertisement_duration * 1000);
              });
              setTimeout(() => {
                skipBtn.style.display = 'block';
              }, +skip_timeout * 1000);
              skipBtn.addEventListener('click', (e) => {
                e.preventDefault();
                plr.ads.endLinearAdMode();
                skipBtn.style.display = 'none';
                overlay.style.display = 'none';
              });
              plr.one('adended', () => {
                plr.ads.endLinearAdMode();
              });
            });
            plr.on('pause', () => {
              if (!plr.seeking() && plr.paused() && !plr.ended()) {
                const pause = getRandomValue(on_pause_banners);
                overlay.innerHTML = `<a href="${pause.link}" target="_blank" rel="noreferrer noopener"><img src="${pause.ad}"/></a><button class="vjs-big-play-button" type="button" title="ดูต่อ" aria-disabled="false"><span aria-hidden="true" class="vjs-icon-placeholder"></span><span class="vjs-control-text" aria-live="polite">ดูต่อ</span></button>`;
                overlay.style.display = 'block';
              }
            });
            plr.on('playing', () => {
              overlay.style.display = 'none';
            });
            overlay.onclick = () => {
              overlay.style.display = 'none';
              plr.play();
            };
            plr.trigger('adsready');
          }
        }
      );
    }
  }, [videoUrl, poster]);

  return (
    <div className={styles.wrapper}>
      <video
        ref={videoPlayerRef}
        className="video-js vjs-default-skin vjs-big-play-centered"
        preload="metadata"
        playsInline
        controls
        width="100%"
        height="100%"
        src={videoUrl}
        poster={poster}
      />
      <button id="skip" className={styles.buttonSkip} type="button">
        {messages.skip}
      </button>
      <div
        id="overlay"
        className={clsx(
          styles.overlay,
          'video-js',
          'vjs-default-skin',
          'vjs-big-play-centered'
        )}
      />
    </div>
  );
};

export default AdVideo;
