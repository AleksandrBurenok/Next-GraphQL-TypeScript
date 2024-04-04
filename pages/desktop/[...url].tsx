import {
  getServerSideProps as getServerSidePropsHandler,
  GetServerSideProps,
} from 'dataFetching/page/mix';

import { Post as PostI } from 'interfaces/post';
import { Category as CategoryI } from 'interfaces/categories';
import { PageBanners as PageBannersI } from 'interfaces/banners';
import { PageMenu as PageMenuI } from 'interfaces/menu';

import Layout from 'components/Layout/Desktop';
import { Desktop as CategoriesDesktop } from 'components/Pages/Categories';
import { Desktop as PostDesktop } from 'components/Pages/Post';

export async function getServerSideProps({ params }: GetServerSideProps) {
  return getServerSidePropsHandler({ params });
}

interface Props {
  page: PostI;
  category: CategoryI;
  banners: PageBannersI;
  menu: PageMenuI;
}

function Component(props: Props) {
  return (
    <Layout menu={props.menu}>
      {props.category && <CategoriesDesktop {...props} />}
      {props.page && <PostDesktop {...props} />}
    </Layout>
  );
}

export default Component;
