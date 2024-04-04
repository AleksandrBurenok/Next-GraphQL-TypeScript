import clsx from 'clsx';

import { Menu as MenuI } from 'interfaces/menu';

import { Styles } from 'interfaces/props';

import Link from 'components/Link';

import styles from './styles.module.scss';

interface Props extends Styles {
  data: MenuI[];
}

const FooterMenu = ({ data, className }: Props) => {
  return (
    <ul className={clsx(styles.listsMenu, className)}>
      {data.map(({ key, path, title }) => (
        <li key={key} className={styles.listMenu}>
          <Link href={path}>
            <span className={styles.menuLink}>{title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default FooterMenu;
