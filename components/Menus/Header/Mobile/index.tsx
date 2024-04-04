import { Menu as MenuI } from 'interfaces/menu';

import { flatListToHierarchical } from 'helpers/menus';

import SocialLinks from 'components/Shared/Socials/SocialLinks';
import Regions from 'components/Shared/Regions/Mobile';

import SubMenu from './SubMenu';

import styles from './styles.module.scss';

interface Props {
  menu: {
    main: MenuI[];
    mainRight: MenuI[];
    sub: MenuI[];
  };
  closeMenu: () => void;
}

const MobileMenu = ({ menu, closeMenu }: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapperSubMenu}>
        {flatListToHierarchical(menu.main).map(
          ({ path, key, title, children, menu_item_fields }) => (
            <SubMenu
              path={path}
              key={key}
              title={title}
              items={children}
              image={menu_item_fields}
              closeMenu={closeMenu}
            />
          )
        )}
      </div>
      <div className={styles.wrapperSocials}>
        <SocialLinks withoutTitle />
        <Regions className={styles.headerDropdown} />
      </div>
      {flatListToHierarchical(menu.mainRight).map(
        ({ path, key, title, children, menu_item_fields }) => (
          <SubMenu
            path={path}
            key={key}
            title={title}
            items={children}
            image={menu_item_fields}
            closeMenu={closeMenu}
          />
        )
      )}
    </div>
  );
};

export default MobileMenu;
