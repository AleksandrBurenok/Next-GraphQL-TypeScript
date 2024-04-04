import { useIntl } from 'react-intl';

import { Menu as MenuI } from 'interfaces/menu';

import Wrapper from 'components/Page/Wrapper';
import FooterMenu from 'components/Menus/Footer/Menu';
import SocialLinks from 'components/Shared/Socials/SocialLinks';
import Regions from 'components/Shared/Regions';

import Logo from 'icons/Logo';

import styles from './styles.module.scss';

interface Props {
  data: MenuI[];
}

function Footer({ data }: Props) {
  const { messages, formatMessageWithParams } = useIntl();

  return (
    <footer className={styles.root}>
      <Wrapper className={styles.wrapper}>
        <div className={styles.column}>
          <Logo />
          <span className={styles.copyright}>
            {formatMessageWithParams(messages.copyright, {
              date: new Date().getFullYear(),
            })}
          </span>
        </div>
        <div className={styles.column}>
          <p className={styles.title}>{messages.quickLinks}</p>
          <div className={styles.line} />
          <FooterMenu data={data} />
        </div>
        <div className={styles.column}>
          <p className={styles.title}>{messages.socialMedia}</p>
          <div className={styles.line} />
          <SocialLinks />
        </div>
        <div className={styles.column}>
          <p className={styles.title}>{messages.languageRegion}</p>
          <div className={styles.line} />
          <Regions />
        </div>
      </Wrapper>
    </footer>
  );
}

export default Footer;
