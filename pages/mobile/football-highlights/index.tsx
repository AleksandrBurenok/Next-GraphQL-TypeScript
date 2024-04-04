import { getStaticProps as getStaticPropsHandler } from 'dataFetching/page/football-highlights';

import { Category as CategoryI } from 'interfaces/categories';
import { PageBanners as PageBannersI } from 'interfaces/banners';
import { PageMenu as PageMenuI } from 'interfaces/menu';

import Layout from 'components/Layout/Mobile';
import { Mobile as HighlightsMobile } from 'components/Pages/Highlights';

export async function getStaticProps() {
  return getStaticPropsHandler();
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
