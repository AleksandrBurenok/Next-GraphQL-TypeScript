import { TablePageTemplate as TablePageTemplateI } from 'interfaces/pageTemplates/table';
import { PageBanners as PageBannersI } from 'interfaces/banners';

export interface Props {
  page: TablePageTemplateI;
  banners: PageBannersI;
}
