import { getStaticProps as getStaticPropsHandler } from 'dataFetching/page/home';

import { PageMenu as PageMenuI } from 'interfaces/menu';
import { PageBanners as PageBannersI } from 'interfaces/banners';
import { TablePageTemplate as TablePageTemplateI } from 'interfaces/pageTemplates/table';
import { Highlight as HighlightI } from 'interfaces/highlights';
import { League as LeagueI } from 'interfaces/league';

import { Desktop as HomePageDesktop } from 'components/Pages/Homepage';
import Layout from 'components/Layout/Desktop';

export async function getStaticProps() {
  return getStaticPropsHandler();
}

interface Props {
  menu: PageMenuI;
  page: TablePageTemplateI;
  banners: PageBannersI;
  highlights: HighlightI[];
  priorityLeagues: LeagueI[];
  leagues: LeagueI[];
}

function Home(props: Props) {
  return (
    <Layout menu={props.menu}>
      {props.page && <HomePageDesktop {...props} />}
    </Layout>
  );
}

export default Home;
