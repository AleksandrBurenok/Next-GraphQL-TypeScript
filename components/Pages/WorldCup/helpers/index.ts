import { Championship as ChampionshipI } from 'interfaces/championship';
import { Category as CategoryI } from 'interfaces/categories';
import { PageBanners as PageBannersI } from 'interfaces/banners';

export interface Props {
  championship: ChampionshipI;
  category: CategoryI;
  banners: PageBannersI;
}
