import { useIntl } from 'react-intl';

import { socials } from 'constants/socials';

import ArrowDown from 'icons/ArrowDown';

import styles from './styles.module.scss';

const SocialLinks = () => {
  const { messages } = useIntl();

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        aria-label={'Select social'}
        className={styles.current}
      >
        {socials(messages)
          .slice(0, 1)
          .map((social) => {
            const Icon = social.icon;
            return (
              <div key={social.key} className={styles.link}>
                <a
                  className={styles.link}
                  href={social.href}
                  aria-label={social.title}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Icon className={styles.icon} />
                </a>
                <ArrowDown className={styles.arrowIcon} />
              </div>
            );
          })}
      </button>
      <div className={styles.bottomPart}>
        {socials(messages)
          .slice(1)
          .map((social) => {
            const Icon = social.icon;
            return (
              <a
                className={styles.bottomLink}
                href={social.href}
                aria-label={social.title}
                target="_blank"
                rel="noreferrer noopener"
                key={social.key}
              >
                <Icon className={styles.icon} />
              </a>
            );
          })}
      </div>
    </div>
  );
};

export default SocialLinks;
