import { useIntl } from 'react-intl';

import Whistle from 'icons/Whistle';

import styles from './styles.module.scss';

const Header = ({ isCountries }: { isCountries?: boolean }) => {
  const { messages } = useIntl();

  return (
    <>
      <div className={styles.wrapperIcon}>
        <Whistle />
      </div>
      <p>{isCountries ? messages.selectCountry : messages.selectLeague}</p>
    </>
  );
};

export default Header;
