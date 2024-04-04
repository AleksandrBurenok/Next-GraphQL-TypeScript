import { Names } from 'constants/initialData';

import { readInitialData } from 'helpers/readInitialData';

export async function getStaticProps() {
  const [menu, banners] = await Promise.all([
    readInitialData(Names.menu),
    readInitialData(Names.banners),
  ]).catch((err) => {
    return [];
  });

  return {
    props: {
      menu,
      banners,
    },
  };
}
