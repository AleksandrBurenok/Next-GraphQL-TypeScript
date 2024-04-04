import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import { FOOTBALL_NEWS } from 'constants/urls';

import { Menu as MenuI } from 'interfaces/menu';

import { flatListToHierarchical } from 'helpers/menus';

import Link from 'components/Link';
import Tabs from 'components/Tabs/Desktop';
import Tab from 'components/Tabs/Tab';

import SubMenu from './SubMenu';

import styles from './styles.module.scss';

interface Props {
  menu: {
    main: MenuI[];
    sub: MenuI[];
  };
}

const MenuTop = ({ menu }: Props) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <ul className={styles.menuTop}>
      {flatListToHierarchical(menu.main).map(
        ({ path, key, title, children }) => {
          return (
            <li className={styles.menuItem} key={key}>
              <Link href={path}>
                <span className={styles.menuLink}>{title}</span>
              </Link>
              {!!children?.length && (
                <ul className={clsx(styles.menuTop, styles.subMenuTop)}>
                  <div className={styles.triangle} />
                  {path === FOOTBALL_NEWS && (
                    <SubMenu className={styles.insideMenu} data={menu.sub} />
                  )}
                  <div className={styles.leftSide}>
                    <Tabs
                      key={key}
                      isTitle
                      isMenu
                      className={styles.tabs}
                      selectedTab={selectedTab}
                      setSelectedTab={setSelectedTab}
                    >
                      {children?.map(
                        ({ path, key, title, children, menu_item_fields }) => {
                          return (
                            <Tab
                              key={key}
                              title={title}
                              isMenu
                              href={path}
                              className={styles.tab}
                              menuImage={menu_item_fields}
                            >
                              {!!children?.length && (
                                <div key={key} className={styles.rightSide}>
                                  <ul className={styles.insideMenu}>
                                    <div>
                                      {children?.map(
                                        ({
                                          path,
                                          key,
                                          title,
                                          menu_item_fields,
                                        }) => {
                                          return (
                                            <li
                                              className={clsx(
                                                styles.menuItem,
                                                styles.menuLink
                                              )}
                                              key={key}
                                            >
                                              <Link href={path}>
                                                <div className={styles.wrapper}>
                                                  {menu_item_fields!.image && (
                                                    <Image
                                                      alt={
                                                        menu_item_fields!.image
                                                          .altText
                                                      }
                                                      src={
                                                        menu_item_fields!.image
                                                          .mediaItemUrl
                                                      }
                                                      width="24"
                                                      height="24"
                                                    />
                                                  )}
                                                  <span
                                                    className={styles.linkText}
                                                  >
                                                    {title}
                                                  </span>
                                                </div>
                                              </Link>
                                            </li>
                                          );
                                        }
                                      )}
                                    </div>
                                  </ul>
                                </div>
                              )}
                            </Tab>
                          );
                        }
                      )}
                    </Tabs>
                  </div>
                </ul>
              )}
            </li>
          );
        }
      )}
    </ul>
  );
};

export default MenuTop;
