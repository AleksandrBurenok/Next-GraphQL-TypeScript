import { getStaticProps as getStaticPropsHandler } from 'dataFetching/page/fixtures';

import { TablePageTemplate as TablePageTemplateI } from 'interfaces/pageTemplates/table';
import { League as LeagueI } from 'interfaces/league';
import { PageBanners as PageBannersI } from 'interfaces/banners';
import { PageMenu as PageMenuI } from 'interfaces/menu';
import { Post as PostI } from 'interfaces/post';

import { Mobile as FixturesMobile } from 'components/Pages/Fixtures';
import Layout from 'components/Layout/Mobile';

export async function getStaticProps() {
  return getStaticPropsHandler({ league: '' });
}

interface Props {
  page: TablePageTemplateI;
  leagues: { node: PostI }[];
  priorityLeagues: LeagueI[];
  banners: PageBannersI;
  menu: PageMenuI;
  isLeagues: boolean;
}

function Component(props: Props) {
  return (
    <Layout menu={props.menu}>
      {props.page && <FixturesMobile {...props} />}
    </Layout>
  );
}

export default Component;
