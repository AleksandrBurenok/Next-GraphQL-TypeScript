import { useIntl } from 'react-intl';

import { Contacts } from 'enums/contacts';

import Form from 'forms/ContactUs';

import Seo from 'components/Seo';
import Page from 'components/Page/Root';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import Breadcrumbs from 'components/Shared/Breadcrumbs';
import SocialBottom from 'components/Shared/Socials/SocialBottom';
import { Desktop as PopupBannerDesktop } from 'components/Banners/PopupBanner';

import { Props } from '../helpers';

import styles from './styles.module.scss';

export const Desktop = ({ page, banners }: Props) => {
  const { messages } = useIntl();

  return (
    <>
      {page && (
        <>
          <Seo {...page.seo} path={`${page.slug}/`} />

          <Page>
            <Breadcrumbs slug={page.slug} parentTitle="" title={page.title} />
            <Grid>
              <MainContainer className={styles.main}>
                <div className={styles.wrapper}>
                  <h1 className={styles.title}>{page.title}</h1>
                  <div className={styles.wrapperContent}>
                    <Form />

                    <div className={styles.wrapperContacts}>
                      <div className={styles.wrap}>
                        <h2 className={styles.h2}>
                          {`${messages.phoneNumbers}:`}
                        </h2>
                        <p className={styles.text}>{Contacts.telephone}</p>
                        <p className={styles.text}>{Contacts.telephone2}</p>
                      </div>

                      <div>
                        <h2 className={styles.h2}>
                          {`${messages.openingHours}:`}
                        </h2>
                        <p
                          className={styles.text}
                        >{`${messages.monday} - ${messages.friday}: ${Contacts.openingHours}`}</p>
                        <p
                          className={styles.text}
                        >{`${messages.saturday} - ${messages.sunday}: ${messages.closed}`}</p>
                      </div>
                    </div>
                  </div>
                  <SocialBottom />
                </div>
              </MainContainer>
            </Grid>
          </Page>
          <PopupBannerDesktop banners={banners} />
        </>
      )}
    </>
  );
};

export default Desktop;
