import { useIntl } from 'react-intl';

import styles from './styles.module.scss';

function Error() {
  const { messages, formatMessageWithParams } = useIntl();

  const onReload = () => {
    window.location.reload();
  };

  return (
    <div className={styles.root}>
      <h4>
        {formatMessageWithParams(messages.looksLikeSomethingWentWrong, {
          reload: (
            <span onClick={onReload} aria-hidden="true">
              {messages.reload}
            </span>
          ),
        })}
      </h4>
    </div>
  );
}

export default Error;
