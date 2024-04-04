import { ReactElement } from 'react';
import { useIntl } from 'react-intl';
import Image from 'next/image';
import clsx from 'clsx';

import { Styles } from 'interfaces/props';

import TabTitle from '../TabTitle';

import styles from './styles.module.scss';

interface Props extends Styles {
  children: ReactElement[];
  isTitle?: boolean;
  isMenu?: boolean;
  isPrediction?: boolean;
  selectedTab: number;
  setSelectedTab: (index: number) => void;
}

const Tabs = ({
  children,
  isTitle = false,
  isMenu = false,
  className,
  isPrediction = false,
  selectedTab,
  setSelectedTab,
}: Props) => {
  const { messages } = useIntl();

  return (
    <div className={styles.tabs}>
      {!isTitle && <h2 className="red-left-flag">{messages.featureLeagues}</h2>}
      <div className={className}>
        <ul className={clsx(styles.wrapper, isMenu && styles.wrapperMenu)}>
          {children.map((item, index) => {
            return (
              <TabTitle
                key={index}
                index={index}
                setSelectedTab={setSelectedTab}
                active={selectedTab === index}
                item={item}
                isPrediction={isPrediction}
              >
                {item.props.image && (
                  <Image
                    alt={messages.imageAltPlaceholder}
                    src={item.props.image}
                    width="34"
                    height="34"
                  />
                )}
              </TabTitle>
            );
          })}
        </ul>
        {isPrediction && <div className={styles.redLine} />}
        {children[selectedTab]}
      </div>
    </div>
  );
};

export default Tabs;
