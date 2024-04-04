import { getStaticProps as getStaticPropsHandler } from 'dataFetching/page/campaign-prizes';

import { PageMenu as PageMenuI } from 'interfaces/menu';
import { ChampionshipWinners as ChampionshipWinnersI } from 'interfaces/championship';
import { PageBanners as PageBannersI } from 'interfaces/banners';

import { Mobile as CampaignPrizesMobile } from 'components/Pages/CampaignPrizes';
import Layout from 'components/Layout/Mobile';

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
      {props.page && <CampaignPrizesMobile {...props} />}
    </Layout>
  );
}

export default Component;
