import { League as LeagueI } from 'interfaces/league';

import {
  getStaticProps as getStaticPropsHandler,
  getStaticPaths as getStaticPathsHandler,
} from 'dataFetching/page/results';

import { TablePageTemplate as TablePageTemplateI } from 'interfaces/pageTemplates/table';
import { PageBanners as PageBannersI } from 'interfaces/banners';
import { PageMenu as PageMenuI } from 'interfaces/menu';
import { Post as PostI } from 'interfaces/post';

import { Mobile as ResultsMobile } from 'components/Pages/Results';
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
  priorityLeagues: LeagueI[];
  banners: PageBannersI;
  menu: PageMenuI;
  isLeagues: boolean;
}

function Component(props: Props) {
  return (
    <Layout menu={props.menu}>
      {props.page && <ResultsMobile {...props} />}
    </Layout>
  );
}

export default Component;
