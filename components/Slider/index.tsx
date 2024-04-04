import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation } from 'swiper';
import clsx from 'clsx';

import 'swiper/css';

import { Swiper as SwiperT } from 'swiper/types';

import Icon from 'components/Icon';

import { SlidePrevButton, SlideNextButton } from './SliderButtons';

import styles from './styles.module.scss';

interface Props {
  images: {
    altText: string;
    guid: string;
  }[];
  loop?: boolean;
  isMobile?: boolean;
}

const Slider = ({ images, loop = false, isMobile = false }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const ref = useRef<SwiperT>();

  return (
    <div className={styles.root}>
      <div className={styles.wrapperSlider}>
        <Swiper
          onSwiper={(swiper) => {
            ref.current = swiper;
          }}
          loop={loop}
          modules={[Thumbs, Navigation]}
          grabCursor
          className={styles.slider}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
        >
          {images.map(({ altText, guid }, index) => (
            <SwiperSlide key={index}>
              <div className={styles.imgWrapperSlider}>
                <Icon alt={altText} src={guid} />
              </div>
            </SwiperSlide>
          ))}
          <SlidePrevButton />
          <SlideNextButton />
        </Swiper>
      </div>
      <Swiper
        watchSlidesProgress
        loop={loop}
        modules={[Thumbs, Navigation]}
        slidesPerView={3}
        direction={isMobile ? 'horizontal' : 'vertical'}
        className={styles.sliderThumbs}
      >
        {images.map(({ altText, guid }, index) => {
          return (
            <SwiperSlide
              key={index}
              onClick={() => {
                if (ref.current) {
                  setActiveIndex(index);
                  ref.current.slideTo(index + 1);
                }
              }}
            >
              <div
                className={clsx(
                  styles.imgWrapperSliderThumbs,
                  activeIndex === index && styles.imgWrapperSliderThumbsActive
                )}
              >
                <Icon alt={altText} src={guid} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Slider;
