import clsx from 'clsx';

import { Social } from 'enums/social';

import Facebook from 'icons/Facebook';
import Twitter from 'icons/Twitter';
import Instagram from 'icons/Instagram';
import Line from 'icons/Line';

import { Styles as StylesI } from 'interfaces/props';

import styles from './styles.module.scss';

const SocialBottom = ({ className }: StylesI) => (
  <div className={clsx(styles.socialLinks, className)}>
    <a
      className={styles.link}
      href={Social.FACEBOOK_TH}
      aria-label="Facebook"
      target="_blank"
      rel="noreferrer noopener"
    >
      <Facebook width="32" height="32" className={styles.iconFacebook} />
    </a>
    <a
      className={styles.link}
      href={Social.TWITTER}
      aria-label="Twitter"
      target="_blank"
      rel="noreferrer noopener"
    >
      <Twitter width="32" height="32" className={styles.icon} />
    </a>
    <a
      className={styles.link}
      href={Social.INSTAGRAM}
      aria-label="Instagram"
      target="_blank"
      rel="noreferrer noopener"
    >
      <Instagram width="32" height="32" className={styles.iconInstagram} />
    </a>
    <a
      className={styles.link}
      href={Social.LINE}
      aria-label="Line"
      target="_blank"
      rel="noreferrer noopener"
    >
      <Line width="32" height="32" className={styles.icon} />
    </a>
  </div>
);

export default SocialBottom;
