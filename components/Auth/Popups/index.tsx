import dynamic from 'next/dynamic';

import { Login, Registration, Forgot } from '../Forms';

import styles from './styles.module.scss';

const DynamicDialog = dynamic(() => import('../../Dialog'), {
  ssr: false,
});

interface Props {
  showLoginPopup: boolean;
  closeLoginPopupFunc: () => void;
  showRegisterPopupFunc: () => void;
  showForgotPopupFunc: () => void;
  showRegisterPopup: boolean;
  closeRegisterPopupFunc: () => void;
  showLoginPopupFunc: () => void;
  showForgotPopup: boolean;
  closeForgotPopupFunc: () => void;
}

const Popups = ({
  showLoginPopup,
  closeLoginPopupFunc,
  showRegisterPopupFunc,
  showForgotPopupFunc,
  showRegisterPopup,
  closeRegisterPopupFunc,
  showLoginPopupFunc,
  showForgotPopup,
  closeForgotPopupFunc,
}: Props) => {
  return (
    <>
      {showLoginPopup && (
        <DynamicDialog
          open
          onClose={closeLoginPopupFunc}
          classes={{
            paper: styles.paper,
          }}
        >
          <Login
            closeLoginPopup={closeLoginPopupFunc}
            showRegisterPopup={showRegisterPopupFunc}
            showForgotPopup={showForgotPopupFunc}
          />
        </DynamicDialog>
      )}
      {showRegisterPopup && (
        <DynamicDialog
          open
          onClose={closeRegisterPopupFunc}
          classes={{
            paper: styles.paper,
          }}
        >
          <Registration
            closeRegisterPopup={closeRegisterPopupFunc}
            showLoginPopup={showLoginPopupFunc}
          />
        </DynamicDialog>
      )}
      {showForgotPopup && (
        <DynamicDialog
          open
          onClose={closeForgotPopupFunc}
          classes={{
            paper: styles.paper,
          }}
        >
          <Forgot
            closeForgotPopup={closeForgotPopupFunc}
            showLoginPopup={showLoginPopupFunc}
          />
        </DynamicDialog>
      )}
    </>
  );
};

export default Popups;
