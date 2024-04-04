import { Names } from 'constants/initialData';

import { readInitialData } from 'helpers/readInitialData';

export async function getStaticProps() {
  const [menu, banners] = await Promise.all([
    readInitialData(Names.menu),
    readInitialData(Names.banners),
  ]);

  return {
    props: {
      menu,
      banners,
    },
  };
}
