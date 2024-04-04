import {
  getStaticProps as getStaticPropsHandler,
  getStaticPaths as getStaticPathsHandler,
  GetStaticProps,
} from 'dataFetching/page/football-highlights/league';

import { Category as CategoryI } from 'interfaces/categories';
import { PageBanners as PageBannersI } from 'interfaces/banners';
import { PageMenu as PageMenuI } from 'interfaces/menu';

import Layout from 'components/Layout/Mobile';
import { Mobile as HighlightsMobile } from 'components/Pages/Highlights';

export async function getStaticPaths() {
  return getStaticPathsHandler(true);
}

export async function getStaticProps({ params }: GetStaticProps) {
  return getStaticPropsHandler({ params });
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
      <HighlightsMobile {...props} />
    </Layout>
  );
}

export default Wrapper;
