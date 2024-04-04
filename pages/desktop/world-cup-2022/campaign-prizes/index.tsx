import { getStaticProps as getStaticPropsHandler } from 'dataFetching/page/campaign-prizes';

import { PageMenu as PageMenuI } from 'interfaces/menu';
import { ChampionshipWinners as ChampionshipWinnersI } from 'interfaces/championship';
import { PageBanners as PageBannersI } from 'interfaces/banners';

import { Desktop as CampaignPrizesDesktop } from 'components/Pages/CampaignPrizes';
import Layout from 'components/Layout/Desktop';

export async function getStaticProps() {
  return getStaticPropsHandler();
}

interface Props {
  page: ChampionshipWinnersI;
  banners: PageBannersI;
  menu: PageMenuI;
}

function Component(props: Props) {
  return (
    <Layout menu={props.menu}>
      {props.page && <CampaignPrizesDesktop {...props} />}
    </Layout>
  );
}

export default Component;
