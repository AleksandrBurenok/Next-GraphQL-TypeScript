import { getStaticProps as getStaticPropsHandler } from 'dataFetching/page/404';

import { PageMenu as PageMenuI } from 'interfaces/menu';
import { PageBanners as PageBannersI } from 'interfaces/banners';

import { isMobile } from 'helpers/device';

import Desktop from 'components/Layout/Desktop';
import Mobile from 'components/Layout/Mobile';
import { Desktop as Custom404Desktop } from 'components/Pages/404';
import { Mobile as Custom404Mobile } from 'components/Pages/404';

export async function getStaticProps() {
  return getStaticPropsHandler();
}

interface Props {
  menu: PageMenuI;
  isSsr: boolean;
  banners: PageBannersI;
}

function Custom404(props: Props) {
  if (!props.isSsr) {
    if (isMobile(navigator.userAgent)) {
      return (
        <Mobile menu={props.menu}>
          <Custom404Mobile {...props} />
        </Mobile>
      );
    } else {
      return (
        <Desktop menu={props.menu}>
          <Custom404Desktop {...props} />
        </Desktop>
      );
    }
  }
  return [];
}

export default Custom404;
