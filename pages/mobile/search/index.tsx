import { getStaticProps as getStaticPropsHandler } from 'dataFetching/page/search';

import { PageMenu as PageMenuI } from 'interfaces/menu';
import { PageBanners as PageBannersI } from 'interfaces/banners';

import { Mobile as SearchMobile } from 'components/Pages/Search';
import Layout from 'components/Layout/Mobile';

export async function getStaticProps() {
  return getStaticPropsHandler();
}

interface Props {
  menu: PageMenuI;
  banners: PageBannersI;
}

function Component(props: Props) {
  return (
    <Layout menu={props.menu}>
      <SearchMobile {...props} />
    </Layout>
  );
}

export default Component;
