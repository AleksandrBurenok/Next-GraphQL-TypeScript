import {
  getServerSideProps as getServerSidePropsHandler,
  GetServerSideProps,
} from 'dataFetching/page/prediction';

import { PageMenu as PageMenuI } from 'interfaces/menu';
import { TablePageTemplate as TablePageTemplateI } from 'interfaces/pageTemplates/table';
import { PageBanners as PageBannersI } from 'interfaces/banners';
import { Championship as ChampionshipI } from 'interfaces/championship';

import { Mobile as PredictionMobile } from 'components/Pages/Prediction';
import Layout from 'components/Layout/Mobile';

export async function getServerSideProps({ params }: GetServerSideProps) {
  return getServerSidePropsHandler({ params });
}

interface Props {
  page: TablePageTemplateI;
  championship: ChampionshipI;
  banners: PageBannersI;
  menu: PageMenuI;
  id: string;
}

function Component(props: Props) {
  return (
    <Layout menu={props.menu}>
      {props.page && <PredictionMobile {...props} />}
    </Layout>
  );
}

export default Component;
