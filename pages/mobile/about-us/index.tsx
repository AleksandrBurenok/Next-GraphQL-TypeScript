import { getStaticProps as getStaticPropsHandler } from 'dataFetching/page/about-us';

import { PageMenu as PageMenuI } from 'interfaces/menu';
import { TablePageTemplate as TablePageTemplateI } from 'interfaces/pageTemplates/table';
import { PageBanners as PageBannersI } from 'interfaces/banners';

import { Mobile as AboutUsMobile } from 'components/Pages/AboutUs';
import Layout from 'components/Layout/Mobile';

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
      {props.page && <AboutUsMobile {...props} />}
    </Layout>
  );
}

export default Component;
