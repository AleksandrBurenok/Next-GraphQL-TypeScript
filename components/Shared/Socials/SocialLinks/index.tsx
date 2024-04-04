import { useIntl } from 'react-intl';

import { socials } from 'constants/socials';

import styles from './styles.module.scss';

interface Props {
  withoutTitle?: boolean;
}

const SocialLinks = ({ withoutTitle = false }: Props) => {
  const { messages } = useIntl();

  return (
    <ul className={styles.listsMenu}>
      {socials(messages).map((social) => {
        const Icon = social.icon;
        return (
          <li key={social.key} className={styles.listMenu}>
            <a
              className={styles.linkMenu}
              href={social.href}
              aria-label={social.title}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Icon
                className={styles.icon}
                width={withoutTitle ? 32 : 24}
                height={withoutTitle ? 32 : 24}
              />
              {!withoutTitle && <span>{social.title}</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default SocialLinks;
