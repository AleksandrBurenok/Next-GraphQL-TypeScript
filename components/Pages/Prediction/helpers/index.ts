import { TablePageTemplate as TablePageTemplateI } from 'interfaces/pageTemplates/table';
import { PageBanners as PageBannersI } from 'interfaces/banners';
import { Championship as ChampionshipI } from 'interfaces/championship';

export interface Props {
  page: TablePageTemplateI;
  championship: ChampionshipI;
  banners: PageBannersI;
  id: string;
}
