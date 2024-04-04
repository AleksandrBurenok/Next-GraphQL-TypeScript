import { useSwiper } from 'swiper/react';
import clsx from 'clsx';

import { Styles } from 'interfaces/props';

import ArrowLeft from 'icons/ArrowLeft';
import ArrowRight from 'icons/ArrowRight';

import styles from './styles.module.scss';

interface Props extends Styles {}

export const SlidePrevButton = ({ className }: Props) => {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => {
        swiper.slidePrev();
      }}
      className={clsx(styles.arrowButton, styles.arrowButtonPrev, className)}
    >
      <ArrowLeft />
    </button>
  );
};

export const SlideNextButton = ({ className }: Props) => {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => {
        swiper.slideNext();
      }}
      className={clsx(styles.arrowButton, styles.arrowButtonNext, className)}
    >
      <ArrowRight />
    </button>
  );
};
