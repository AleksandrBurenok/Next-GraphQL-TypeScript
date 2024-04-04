import {
  getStaticProps as getStaticPropsHandler,
  getStaticPaths as getStaticPathsHandler,
  GetStaticProps,
} from 'dataFetching/page/football-highlights/league';

import { Category as CategoryI } from 'interfaces/categories';
import { PageBanners as PageBannersI } from 'interfaces/banners';
import { PageMenu as PageMenuI } from 'interfaces/menu';

import Layout from 'components/Layout/Desktop';
import { Desktop as HighlightsDesktop } from 'components/Pages/Highlights';

export async function getStaticProps({ params }: GetStaticProps) {
  return getStaticPropsHandler({ params });
}

export async function getStaticPaths() {
  return getStaticPathsHandler();
}

interface Props {
  category: CategoryI;
  banners: PageBannersI;
  menu: PageMenuI;
}

const Wrapper = (props: Props) => (
  <>{props.category && <Component {...props} />}</>
);

function Component(props: Props) {
  return (
    <Layout menu={props.menu}>
      <HighlightsDesktop {...props} />
    </Layout>
  );
}

export default Wrapper;
