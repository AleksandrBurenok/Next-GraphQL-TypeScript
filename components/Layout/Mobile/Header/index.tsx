import { useState } from 'react';

import { Menu as MenuI } from 'interfaces/menu';

import Logo from 'icons/Logo';
import Menu from 'icons/Menu';
import Close from 'icons/Close';

import Wrapper from 'components/Page/Wrapper';
import Search from 'components/Search';
import MobileMenu from 'components/Menus/Header/Mobile';
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
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.root}>
      <nav className={styles.primary}>
        <Wrapper className={styles.wrapper}>
          <div className={styles.leftMenu}>
            <Logo />
          </div>
          <div className={styles.rightMenu}>
            <Search />
            <Auth />
            {!isOpen ? (
              <Menu onClick={toggleMenu} />
            ) : (
              <Close onClick={toggleMenu} />
            )}
            {isOpen && <MobileMenu menu={menu} closeMenu={toggleMenu} />}
          </div>
        </Wrapper>
      </nav>
    </header>
  );
}

export default Header;
