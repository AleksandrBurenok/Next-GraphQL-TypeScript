import { getStaticProps as getStaticPropsHandler } from 'dataFetching/page/search';

import { PageMenu as PageMenuI } from 'interfaces/menu';
import { PageBanners as PageBannersI } from 'interfaces/banners';

import { Desktop as SearchDesktop } from 'components/Pages/Search';
import Layout from 'components/Layout/Desktop';

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
      <SearchDesktop {...props} />
    </Layout>
  );
}

export default Component;
