import { Menu as MenuI } from 'interfaces/menu';

import { flatListToHierarchical } from 'helpers/menus';

import Link from 'components/Link';

import styles from './styles.module.scss';

interface Props {
  data: MenuI[];
}

const MenuTopRight = ({ data }: Props) => {
  return (
    <ul className={styles.menuTop}>
      {flatListToHierarchical(data).map(({ path, key, title, children }) => (
        <li className={styles.menuItem} key={key}>
          <Link href={path}>
            <span className={styles.menuLink}>{title}</span>
          </Link>
          {!!children?.length && (
            <ul className={`${styles.menuTop} ${styles.subMenuTop}`}>
              {children?.map(({ path, key, title }) => (
                <li className={styles.menuItem} key={key}>
                  <Link href={path}>
                    <span className={styles.menuLink}>{title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MenuTopRight;
