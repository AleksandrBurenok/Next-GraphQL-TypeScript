import clsx from 'clsx';

import { Styles } from 'interfaces/props';
import { Menu as MenuI } from 'interfaces/menu';

import { Menu } from 'interfaces/menu';

import Link from 'components/Link';

import styles from './styles.module.scss';

interface Props extends Styles {
  data: MenuI[];
  isMobile?: boolean;
  closeMenu?: () => void;
}

const SubMenu = ({ className, data, isMobile, closeMenu }: Props) => {
  const items = !isMobile ? data : data.slice(1);

  return (
    <ul className={clsx(styles.submenu, className)}>
      {items.map(({ path, key, title }: Menu) => (
        <li className={styles.menuItem} key={key} onClick={closeMenu}>
          <Link href={path}>
            <span className={styles.menuLink}>{title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SubMenu;
