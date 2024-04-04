import { getStaticProps as getStaticPropsHandler } from 'dataFetching/page/privacy-policy';

import { PageMenu as PageMenuI } from 'interfaces/menu';
import { TablePageTemplate as TablePageTemplateI } from 'interfaces/pageTemplates/table';
import { PageBanners as PageBannersI } from 'interfaces/banners';

import { Desktop as PolicyDesktop } from 'components/Pages/Policy';
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
      {props.page && <PolicyDesktop {...props} />}
    </Layout>
  );
}

export default Component;
