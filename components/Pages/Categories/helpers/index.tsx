import { Category as CategoryI } from 'interfaces/categories';
import { PageBanners as PageBannersI } from 'interfaces/banners';

export interface Props {
  category: CategoryI;
  banners: PageBannersI;
}
