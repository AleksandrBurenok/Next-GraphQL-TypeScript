import { Messages } from 'interfaces/intl';

import Button from 'components/Shared/Button';

import styles from './styles.module.scss';

interface Props {
  messages: Messages;
  username: string;
  showLoginPopupFunc: () => void;
  showRegisterPopupFunc: () => void;
  stageName: string;
  date: string;
}

const Header = ({
  messages,
  username,
  showLoginPopupFunc,
  showRegisterPopupFunc,
  stageName,
  date,
}: Props) => {
  return (
    <div className={styles.wrapperText}>
      <p className={styles.title}>{stageName}</p>
      {!username && (
        <p className={styles.underTitle}>
          {messages.please}{' '}
          <Button
            type="button"
            className={styles.btnLogin}
            onClick={showLoginPopupFunc}
          >
            {messages.login}
          </Button>{' '}
          {messages.or}{' '}
          <Button
            type="button"
            className={styles.btnRegister}
            onClick={showRegisterPopupFunc}
          >
            {messages.register}
          </Button>{' '}
          {messages.toPlaceABet}
        </p>
      )}
      <p className={styles.underTitle}>
        {messages.pleasePlaceYourPredictionBy} <span>{date}</span>
      </p>
    </div>
  );
};

export default Header;
