import { getStaticProps as getStaticPropsHandler } from 'dataFetching/page/profile';

import { PageMenu as PageMenuI } from 'interfaces/menu';
import { PageBanners as PageBannersI } from 'interfaces/banners';

import { Desktop as ProfileDesktop } from 'components/Pages/Profile';
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
      <ProfileDesktop {...props} />
    </Layout>
  );
}

export default Component;
