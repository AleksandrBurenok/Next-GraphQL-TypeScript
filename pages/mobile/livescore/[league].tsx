import {
  getStaticProps as getStaticPropsHandler,
  getStaticPaths as getStaticPathsHandler,
} from 'dataFetching/page/livescore';

import { TablePageTemplate as TablePageTemplateI } from 'interfaces/pageTemplates/table';
import { PageBanners as PageBannersI } from 'interfaces/banners';
import { PageMenu as PageMenuI } from 'interfaces/menu';
import { Post as PostI } from 'interfaces/post';
import { League as LeagueI } from 'interfaces/league';

import { Mobile as LivescoreMobile } from 'components/Pages/Livescore';
import Layout from 'components/Layout/Mobile';

export async function getStaticPaths() {
  return getStaticPathsHandler(true);
}

export async function getStaticProps({ params: { league } }: Props) {
  return getStaticPropsHandler({ league });
}

interface Props {
  params: {
    league: string;
  };
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
      {props.page && <LivescoreMobile {...props} />}
    </Layout>
  );
}

export default Component;
