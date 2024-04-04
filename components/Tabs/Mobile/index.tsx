import { ReactElement, useState, useRef } from 'react';
import { useIntl } from 'react-intl';
import Image from 'next/image';
import clsx from 'clsx';

import ArrowDown from 'icons/ArrowDown';

import { useOnClickOutside } from 'hooks';

import Button from 'components/Shared/Button';

import TabTitle from '../TabTitle';

import styles from './styles.module.scss';

interface Props {
  children: ReactElement[];
  tabsInLine?: number;
  selectedTab: number;
  setSelectedTab: (entity: any) => void;
}

const Tabs = ({
  children,
  tabsInLine = 5,
  selectedTab,
  setSelectedTab,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { messages } = useIntl();

  const leaguesRef = useRef(null);

  const toggleLeagues = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdownLeagues = () => {
    setIsOpen(false);
  };

  useOnClickOutside(leaguesRef, closeDropdownLeagues);

  return (
    <div className={styles.tabs}>
      <h2 className="red-left-flag">{messages.featureLeagues}</h2>
      <div>
        <ul className={styles.wrapper}>
          {children.slice(0, tabsInLine).map((item, index) => {
            return (
              <TabTitle
                key={index}
                item={item}
                index={index}
                setSelectedTab={setSelectedTab}
                active={selectedTab === index}
              >
                <Image
                  alt={item.props.title || messages.imageAltPlaceholder}
                  src={item.props.image}
                  width="30"
                  height="30"
                />
              </TabTitle>
            );
          })}
          <li>
            <Button
              type="button"
              onClick={toggleLeagues}
              className={styles.btn}
              aria-label="arrow-down"
            >
              <ArrowDown
                className={clsx(styles.arrow, isOpen && styles.rotate)}
              />
            </Button>
            <div ref={leaguesRef} className={styles.dropdown}>
              {isOpen &&
                children.slice(tabsInLine).map((item, index) => {
                  return (
                    <TabTitle
                      key={index}
                      item={item}
                      index={index + tabsInLine}
                      setSelectedTab={setSelectedTab}
                      active={selectedTab === index + tabsInLine}
                    >
                      <Image
                        alt={item.props.title || messages.imageAltPlaceholder}
                        src={item.props.image}
                        width="30"
                        height="30"
                      />
                    </TabTitle>
                  );
                })}
            </div>
          </li>
        </ul>
        {children[selectedTab]}
      </div>
    </div>
  );
};

export default Tabs;
