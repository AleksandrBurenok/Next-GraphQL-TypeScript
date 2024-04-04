import { getStaticProps as getStaticPropsHandler } from 'dataFetching/page/livescore';

import { TablePageTemplate as TablePageTemplateI } from 'interfaces/pageTemplates/table';
import { League as LeagueI } from 'interfaces/league';
import { PageBanners as PageBannersI } from 'interfaces/banners';
import { PageMenu as PageMenuI } from 'interfaces/menu';
import { Post as PostI } from 'interfaces/post';

import { Desktop as LivescoreDesktop } from 'components/Pages/Livescore';
import Layout from 'components/Layout/Desktop';

export async function getStaticProps() {
  return getStaticPropsHandler({ league: '' });
}

interface Props {
  page: TablePageTemplateI;
  leagues: { node: PostI }[];
  leaguesThai: { node: PostI }[];
  countries: { node: PostI }[];
  priorityLeagues: LeagueI[];
  banners: PageBannersI;
  menu: PageMenuI;
  isLeagues: boolean;
  isCountries: boolean;
}

function Component(props: Props) {
  return (
    <Layout menu={props.menu}>
      {props.page && <LivescoreDesktop {...props} />}
    </Layout>
  );
}

export default Component;
