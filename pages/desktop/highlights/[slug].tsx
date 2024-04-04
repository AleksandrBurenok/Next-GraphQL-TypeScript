import {
  getStaticPaths as getStaticPathsHandler,
  getStaticProps as getStaticPropsHandler,
  GetStaticProps,
} from 'dataFetching/page/highlight';

import { Post as PostI } from 'interfaces/post';
import { PageMenu as PageMenuI } from 'interfaces/menu';
import { PageBanners as PageBannersI } from 'interfaces/banners';

import Layout from 'components/Layout/Desktop';
import { Desktop as HighlightDesktop } from 'components/Pages/Highlight';

export async function getStaticPaths() {
  return getStaticPathsHandler();
}

export async function getStaticProps(props: GetStaticProps) {
  return getStaticPropsHandler(props);
}

interface Props {
  page: PostI;
  menu: PageMenuI;
  banners: PageBannersI;
}

function Component(props: Props) {
  return (
    <Layout menu={props.menu}>
      {props.page && <HighlightDesktop {...props} />}
    </Layout>
  );
}

export default Component;
