import { Names } from 'constants/initialData';

import { readInitialData } from 'helpers/readInitialData';

export async function getStaticProps() {
  const [menu] = await Promise.all([readInitialData(Names.menu)]);

  return {
    props: {
      menu,
    },
  };
}
