import { getStaticProps as getStaticPropsHandler } from 'dataFetching/page/contact-us';

import { PageMenu as PageMenuI } from 'interfaces/menu';
import { TablePageTemplate as TablePageTemplateI } from 'interfaces/pageTemplates/table';
import { PageBanners as PageBannersI } from 'interfaces/banners';

import { Desktop as ContactUsDesktop } from 'components/Pages/ContactUs';
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
      {props.page && <ContactUsDesktop {...props} />}
    </Layout>
  );
}

export default Component;
