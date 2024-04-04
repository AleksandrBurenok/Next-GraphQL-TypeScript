import {
  getStaticProps as getStaticPropsHandler,
  getStaticPaths as getStaticPathsHandler,
} from 'dataFetching/page/ranking';

import { TablePageTemplate as TablePageTemplateI } from 'interfaces/pageTemplates/table';
import { PageBanners as PageBannersI } from 'interfaces/banners';
import { PageMenu as PageMenuI } from 'interfaces/menu';
import { Post as PostI } from 'interfaces/post';
import { League as LeagueI } from 'interfaces/league';

import { Desktop as RankingDesktop } from 'components/Pages/Ranking';
import Layout from 'components/Layout/Desktop';

export async function getStaticPaths() {
  return getStaticPathsHandler();
}

interface Props {
  params: {
    league: string;
  };
}

export async function getStaticProps({ params: { league } }: Props) {
  return getStaticPropsHandler({ league });
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
      {props.page && <RankingDesktop {...props} />}
    </Layout>
  );
}

export default Component;
