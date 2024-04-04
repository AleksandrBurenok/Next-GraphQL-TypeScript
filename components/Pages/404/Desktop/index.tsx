import { useIntl } from 'react-intl';

import Image404 from 'icons/Image404';

import Page from 'components/Page/Root';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import Link from 'components/Link';
import { Desktop as PopupBannerDesktop } from 'components/Banners/PopupBanner';

import { Props } from '../helpers';

import styles from './styles.module.scss';

export const Desktop = ({ banners }: Props) => {
  const { messages } = useIntl();

  return (
    <>
      <Page>
        <Grid>
          <MainContainer className={styles.main}>
            <div className={styles.wrapper}>
              <div className={styles.wrapperImage}>
                <Image404 />
              </div>
              <div className={styles.wrapperContent}>
                <p className={styles.content}>{messages.looksLikePage}</p>
                <p className={styles.content}>
                  {messages.goBack}
                  <Link href="/">
                    <span className={styles.link}>
                      &nbsp;{messages.mainPage}
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </MainContainer>
        </Grid>
      </Page>
      <PopupBannerDesktop banners={banners} />
    </>
  );
};

export default Desktop;
