import { getStaticProps as getStaticPropsHandler } from 'dataFetching/page/reset-password';

import { PageMenu as PageMenuI } from 'interfaces/menu';

import ResetPassword from 'components/Pages/ResetPassword';
import Layout from 'components/Layout/Mobile';

export async function getStaticProps() {
  return getStaticPropsHandler();
}

interface Props {
  menu: PageMenuI;
}

function Component(props: Props) {
  return (
    <Layout menu={props.menu}>
      <ResetPassword />
    </Layout>
  );
}

export default Component;
