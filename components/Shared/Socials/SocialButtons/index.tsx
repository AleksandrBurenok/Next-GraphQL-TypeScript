import clsx from 'clsx';

import { Styles } from 'interfaces/props';

import FacebookButton from 'icons/FacebookButton';
import TwitterButton from 'icons/TwitterButton';
import LineButton from 'icons/LineButton';

import FacebookShareButton from 'components/ShareButtons/Facebook';
import TwitterShareButton from 'components/ShareButtons/Twitter';
import LineShareButton from 'components/ShareButtons/Line';

import styles from './styles.module.scss';

interface Props extends Styles {
  url: string;
}

const SocialButtons = ({ url, className }: Props) => {
  return (
    <div className={clsx(styles.root, className)}>
      <FacebookShareButton
        url={url}
        className={clsx(styles.button, styles.facebook)}
      >
        <FacebookButton className={styles.icon} />
        <span className={styles.text}>Facebook</span>
      </FacebookShareButton>

      <TwitterShareButton
        url={url}
        className={clsx(styles.button, styles.twitter)}
      >
        <TwitterButton className={styles.icon} />
        <span className={styles.text}>Twitter</span>
      </TwitterShareButton>

      <LineShareButton url={url} className={clsx(styles.button, styles.line)}>
        <LineButton className={styles.icon} />
        <span className={styles.text}>Line</span>
      </LineShareButton>
    </div>
  );
};

export default SocialButtons;
