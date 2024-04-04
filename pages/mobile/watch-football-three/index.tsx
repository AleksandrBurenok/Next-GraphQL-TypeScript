import { getStaticProps as getStaticPropsHandler } from 'dataFetching/page/watch-football-three';

import { TablePageTemplate as TablePageTemplateI } from 'interfaces/pageTemplates/table';
import { PageBanners as PageBannersI } from 'interfaces/banners';
import { PageMenu as PageMenuI } from 'interfaces/menu';

import Layout from 'components/Layout/Mobile';
import { Mobile as WatchFootballMobile } from 'components/Pages/WatchFootball';

export async function getStaticProps() {
  return getStaticPropsHandler();
}

interface Props {
  page: TablePageTemplateI;
  banners: PageBannersI;
  menu: PageMenuI;
}

function Component(props: Props) {
  return (
    <Layout menu={props.menu}>
      {props.page && <WatchFootballMobile {...props} />}
    </Layout>
  );
}

export default Component;
