import clsx from 'clsx';
import { useIntl } from 'react-intl';

import { useAuth } from 'context/auth';

import { useAuthPopups } from 'hooks';

import User from 'icons/User';

import Button from 'components/Shared/Button';

import { logout } from './Utils';

import styles from './styles.module.scss';
import Popups from './Popups';

const Auth = () => {
  const { messages } = useIntl();

  const user = useAuth();

  const {
    showLoginPopup,
    showRegisterPopup,
    showForgotPopup,
    showLoginPopupFunc,
    closeLoginPopupFunc,
    showRegisterPopupFunc,
    closeRegisterPopupFunc,
    showForgotPopupFunc,
    closeForgotPopupFunc,
  } = useAuthPopups();

  return (
    <>
      {!user.username ? (
        <Button
          type="button"
          className={styles.button}
          onClick={showLoginPopupFunc}
        >
          <User aria-label={messages.login} />
        </Button>
      ) : (
        <div className={clsx(styles.button, styles.buttonLoggedIn)}>
          <User />
          <div className={styles.userMenu}>
            <p className={styles.username}>
              {messages.hi} {user.username}
            </p>
            <a className={styles.account} href="/profile/">
              {messages.accountSettings}
            </a>
            <div className={styles.line} />
            <Button
              className={styles.buttonLogout}
              type="button"
              onClick={() =>
                logout(user.setUsername(), user.setEmail(), user.setId())
              }
            >
              {messages.logOut}
            </Button>
          </div>
        </div>
      )}
      <Popups
        showLoginPopup={showLoginPopup}
        showRegisterPopup={showRegisterPopup}
        showForgotPopup={showForgotPopup}
        showLoginPopupFunc={showLoginPopupFunc}
        closeLoginPopupFunc={closeLoginPopupFunc}
        showRegisterPopupFunc={showRegisterPopupFunc}
        closeRegisterPopupFunc={closeRegisterPopupFunc}
        showForgotPopupFunc={showForgotPopupFunc}
        closeForgotPopupFunc={closeForgotPopupFunc}
      />
    </>
  );
};

export default Auth;
