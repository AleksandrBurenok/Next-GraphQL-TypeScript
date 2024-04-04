import { getStaticProps as getStaticPropsHandler } from 'dataFetching/page/about-us';

import { PageMenu as PageMenuI } from 'interfaces/menu';
import { TablePageTemplate as TablePageTemplateI } from 'interfaces/pageTemplates/table';
import { PageBanners as PageBannersI } from 'interfaces/banners';

import { Desktop as AboutUsDesktop } from 'components/Pages/AboutUs';
import Layout from 'components/Layout/Desktop';

export async function getStaticProps() {
  return getStaticPropsHandler();
}

interface Props {
  menu: PageMenuI;
  page: TablePageTemplateI;
  banners: PageBannersI;
}

function Component(props: Props) {
  return (
    <Layout menu={props.menu}>
      {props.page && <AboutUsDesktop {...props} />}
    </Layout>
  );
}

export default Component;
