import { useIntl } from 'react-intl';
import clsx from 'clsx';

import { socials } from 'constants/socials';

import styles from './styles.module.scss';

const SocialWidget = () => {
  const { messages } = useIntl();

  return (
    <div className={styles.widget}>
      <p className={clsx('red-left-flag', styles.widgetTitle)}>
        {messages.followUs}
      </p>
      <ul className={styles.widgetList}>
        {socials(messages).map((social) => {
          const Icon = social.icon;
          return (
            <li key={social.key} className={styles.widgetItem}>
              <a
                className={styles.widgetLink}
                href={social.href}
                aria-label={social.title}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Icon
                  className={styles.icon}
                  width={32}
                  height={32}
                  color="#000"
                />
                <span>{social.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SocialWidget;
