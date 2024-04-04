import { lazy, Suspense } from 'react';

import Preloader from 'icons/Preloader';

const Player = lazy(() => import('./Player'));

interface Props {
  poster: string;
  videoUrl: string;
}

const Wrapper = ({ ...props }: Props) => (
  <Suspense fallback={<Preloader />}>
    <Player {...props} />
  </Suspense>
);

export default Wrapper;
