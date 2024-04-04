import { useIntl } from 'react-intl';

import { useSearch } from 'hooks';

import Preloader from 'icons/Preloader';

import Page from 'components/Page/Root';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import LoadMoreSearchResultPosts from 'components/Shared/LoadMoreSearchResultPosts';
import { Mobile as PopupBannerMobile } from 'components/Banners/PopupBanner';

import NoResults from '../NoResults';
import { Props } from '../helpers';

import styles from './styles.module.scss';

export const Mobile = ({ banners }: Props) => {
  const { messages } = useIntl();

  const {
    searchQuery,
    loading,
    queryResultPosts,
    totalPostResultCount,
    searchError,
  } = useSearch();

  return (
    <>
      <Page>
        <Grid>
          <MainContainer className={styles.main}>
            <h1 className={styles.title}>
              <span className={styles.subTitle}>
                {messages.searchResultsFor}
              </span>
              <br />
              {searchQuery}
            </h1>
            {loading ? (
              <div className={styles.wrapperPreloader}>
                <Preloader />
              </div>
            ) : (
              queryResultPosts &&
              totalPostResultCount !== 0 && (
                <LoadMoreSearchResultPosts
                  posts={queryResultPosts}
                  searchQuery={searchQuery}
                  isSearch
                />
              )
            )}
            {!loading && totalPostResultCount === 0 && (
              <NoResults messages={messages} searchQuery={searchQuery} />
            )}
            {searchError && <div className={styles.error}>{searchError}</div>}
          </MainContainer>
        </Grid>
      </Page>
      <PopupBannerMobile banners={banners} />
    </>
  );
};

export default Mobile;
