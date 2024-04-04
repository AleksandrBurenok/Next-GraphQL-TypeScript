import { useState } from 'react';

const useAuthPopups = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [showForgotPopup, setShowForgotPopup] = useState(false);

  const showLoginPopupFunc = () => {
    setShowLoginPopup(true);
    setShowRegisterPopup(false);
    setShowForgotPopup(false);
  };

  const closeLoginPopupFunc = () => {
    setShowLoginPopup(false);
  };

  const showRegisterPopupFunc = () => {
    setShowRegisterPopup(true);
    setShowLoginPopup(false);
  };

  const closeRegisterPopupFunc = () => {
    setShowRegisterPopup(false);
  };

  const showForgotPopupFunc = () => {
    setShowForgotPopup(true);
    setShowLoginPopup(false);
  };

  const closeForgotPopupFunc = () => {
    setShowForgotPopup(false);
  };

  return {
    showLoginPopup,
    showRegisterPopup,
    showForgotPopup,
    showLoginPopupFunc,
    closeLoginPopupFunc,
    showRegisterPopupFunc,
    closeRegisterPopupFunc,
    showForgotPopupFunc,
    closeForgotPopupFunc,
  };
};

export default useAuthPopups;
