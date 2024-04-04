import { useRouter } from 'next/router';

import { paths } from 'constants/paths';

import { Menu as MenuI } from 'interfaces/menu';

import Logo from 'icons/Logo';

import MenuTop from 'components/Menus/Header/Desktop/MenuTop';
import MenuTopRight from 'components/Menus/Header/MenuTopRight';
import Wrapper from 'components/Page/Wrapper';
import SocialLinks from 'components/Shared/Socials/SocialHeader';
import SubMenu from 'components/Menus/Header/Desktop/SubMenu';
import Search from 'components/Search';
import Auth from 'components/Auth';

import styles from './styles.module.scss';

interface Props {
  menu: {
    main: MenuI[];
    mainRight: MenuI[];
    sub: MenuI[];
  };
}

function Header({ menu }: Props) {
  const { asPath } = useRouter();

  return (
    <header className={styles.root}>
      <nav className={styles.primary}>
        <Wrapper className={styles.wrapper}>
          <div className={styles.leftMenu}>
            <Logo />
            <MenuTop menu={menu} />
          </div>
          <div className={styles.rightMenu}>
            <MenuTopRight data={menu.mainRight} />
            <Search />
            <SocialLinks />
            <div className={styles.stick} />
            <Auth />
          </div>
        </Wrapper>
      </nav>
      {paths.includes(asPath) && (
        <nav className={styles.submenu}>
          <Wrapper>
            <SubMenu data={menu.sub} />
          </Wrapper>
        </nav>
      )}
    </header>
  );
}

export default Header;
