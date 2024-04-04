import { getStaticProps as getStaticPropsHandler } from 'dataFetching/page/world-cup';

import { PageMenu as PageMenuI } from 'interfaces/menu';
import { Championship as ChampionshipI } from 'interfaces/championship';
import { Category as CategoryI } from 'interfaces/categories';
import { PageBanners as PageBannersI } from 'interfaces/banners';

import { Mobile as WorldCupMobile } from 'components/Pages/WorldCup';
import Layout from 'components/Layout/Mobile';

export async function getStaticProps() {
  return getStaticPropsHandler();
}

interface Props {
  championship: ChampionshipI;
  category: CategoryI;
  banners: PageBannersI;
  menu: PageMenuI;
}

function Component(props: Props) {
  return (
    <Layout menu={props.menu}>
      {props.championship && <WorldCupMobile {...props} />}
    </Layout>
  );
}

export default Component;
