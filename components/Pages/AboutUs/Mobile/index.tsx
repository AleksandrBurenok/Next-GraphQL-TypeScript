import { useIntl } from 'react-intl';
import Image from 'next/image';

import imageAboutUs from 'images/logo-placeholder.png';

import Seo from 'components/Seo';
import Page from 'components/Page/Root';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import Icon from 'components/Icon';
import SocialBottom from 'components/Shared/Socials/SocialBottom';
import { Mobile as PopupBannerMobile } from 'components/Banners/PopupBanner';

import { Props } from '../helpers';

import styles from './styles.module.scss';

export const Mobile = ({ page, banners }: Props) => {
  const { messages } = useIntl();

  return (
    <>
      {page && (
        <>
          <Seo {...page.seo} path={`${page.slug}/`} />
          <Page>
            <Grid>
              <MainContainer className={styles.main}>
                <h1 className={styles.title}>{page.title}</h1>
                <div className={styles.wrapper}>
                  <div className={styles.wrapperContent}>
                    {page.content && (
                      <div
                        className={styles.content}
                        dangerouslySetInnerHTML={{ __html: page.content }}
                      />
                    )}
                    {page.featuredImage && (
                      <Icon
                        alt={
                          page.featuredImage.node.altText ||
                          messages.imageAltPlaceholder
                        }
                        src={page.featuredImage.node.guid}
                      />
                    )}
                    <SocialBottom className={styles.socials} />
                    <div className={styles.wrapperImage}>
                      <Image
                        alt={messages.imageAltPlaceholder}
                        src={imageAboutUs}
                      />
                    </div>
                  </div>
                </div>
              </MainContainer>
            </Grid>
          </Page>
          <PopupBannerMobile banners={banners} />
        </>
      )}
    </>
  );
};

export default Mobile;
