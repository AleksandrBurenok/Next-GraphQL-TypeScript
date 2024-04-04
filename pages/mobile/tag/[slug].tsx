import {
  getStaticPaths as getStaticPathsHandler,
  getStaticProps as getStaticPropsHandler,
  GetStaticProps,
} from 'dataFetching/page/tag';

import { Tag as TagI } from 'interfaces/tag';
import { PageMenu as PageMenuI } from 'interfaces/menu';
import { PageBanners as PageBannersI } from 'interfaces/banners';

import Layout from 'components/Layout/Mobile';
import { Mobile as TagMobile } from 'components/Pages/Tag';

export async function getStaticPaths() {
  return getStaticPathsHandler(true);
}

export async function getStaticProps(props: GetStaticProps) {
  return getStaticPropsHandler(props);
}

interface Props {
  page: TagI;
  menu: PageMenuI;
  banners: PageBannersI;
}

function Component(props: Props) {
  return (
    <Layout menu={props.menu}>{props.page && <TagMobile {...props} />}</Layout>
  );
}

export default Component;
