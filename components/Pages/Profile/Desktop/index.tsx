import { useIntl } from 'react-intl';

import { useAuth } from 'context/auth';

import Avatar from 'icons/Avatar';

import Page from 'components/Page/Root';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import Breadcrumbs from 'components/Shared/Breadcrumbs';
import Reset from 'components/Auth/Forms/Reset';
import { Desktop as PopupBannerDesktop } from 'components/Banners/PopupBanner';

import { Props } from '../helpers';

import styles from './styles.module.scss';

export const Desktop = ({ banners }: Props) => {
  const { messages } = useIntl();

  const user = useAuth();

  return (
    <>
      <Page>
        <Breadcrumbs slug="" parentTitle="" title={messages.profile} />
        <Grid>
          <MainContainer className={styles.main}>
            <div className={styles.background}>
              <h1 className={styles.title}>{messages.accountSettings}</h1>
              {user.username ? (
                <div className={styles.wrapper}>
                  <div className={styles.userInfo}>
                    <div className={styles.wrapperAvatar}>
                      <Avatar />
                    </div>
                    <div className={styles.wrapperUserInfo}>
                      <p className={styles.username}>{user.username}</p>
                      <p className={styles.email}>{user.email}</p>
                    </div>
                    <div className={styles.stick} />
                    <Reset isProfile />
                  </div>
                </div>
              ) : (
                <p className={styles.noLoginText}>{messages.pleaseLogin}</p>
              )}
            </div>
          </MainContainer>
        </Grid>
      </Page>
      <PopupBannerDesktop banners={banners} />
    </>
  );
};

export default Desktop;
