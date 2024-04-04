import { useIntl } from 'react-intl';
import clsx from 'clsx';

import { Menu as MenuI } from 'interfaces/menu';

import Logo from 'icons/Logo';

import Wrapper from 'components/Page/Wrapper';
import FooterMenu from 'components/Menus/Footer/Menu';
import SocialLinks from 'components/Shared/Socials/SocialLinks';
import Regions from 'components/Shared/Regions/Mobile';

import styles from './styles.module.scss';

interface Props {
  data: MenuI[];
}

function Footer({ data }: Props) {
  const { messages, formatMessageWithParams } = useIntl();

  return (
    <footer className={styles.root}>
      <Wrapper>
        <div className={styles.column}>
          <p className={styles.title}>{messages.quickLinks}</p>
          <div className={styles.line} />
          <FooterMenu data={data} className={styles.list} />
        </div>
        <div className={styles.column}>
          <p className={styles.title}>{messages.socialMedia}</p>
          <div className={styles.line} />
          <div className={styles.wrapperSocials}>
            <SocialLinks withoutTitle />
            <Regions />
          </div>
        </div>
        <div className={clsx(styles.column, styles.wrapperLogo)}>
          <Logo />
          <span className={styles.copyright}>
            {formatMessageWithParams(messages.copyright, {
              date: new Date().getFullYear(),
            })}
          </span>
        </div>
      </Wrapper>
    </footer>
  );
}

export default Footer;
