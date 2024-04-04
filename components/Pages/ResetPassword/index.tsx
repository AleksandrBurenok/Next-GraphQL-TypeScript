import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import Page from 'components/Page/Root';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import Reset from 'components/Auth/Forms/Reset';

import styles from './styles.module.scss';

const DynamicDialog = dynamic(() => import('../../Dialog'), {
  ssr: false,
});

export const ResetPassword = () => {
  const { query, push } = useRouter();

  const [showResetPopup, setShowResetPopup] = useState(false);

  const closeResetPopupFunc = () => {
    setShowResetPopup(false);
    push('/');
  };

  useEffect(() => {
    if (query && query.email && query.code) {
      setShowResetPopup(true);
    }
  }, [query]);

  return (
    <>
      <Page>
        <Grid>
          <MainContainer className={styles.main}>
            {showResetPopup && (
              <DynamicDialog
                open
                onClose={closeResetPopupFunc}
                classes={{
                  paper: styles.paper,
                }}
              >
                <Reset closeResetPopup={closeResetPopupFunc} />
              </DynamicDialog>
            )}
          </MainContainer>
        </Grid>
      </Page>
    </>
  );
};

export default ResetPassword;
