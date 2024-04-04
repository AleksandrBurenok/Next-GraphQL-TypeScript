import Seo from 'components/Seo';
import Page from 'components/Page/Root';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import AccordionFaqSchema from 'components/Shared/AccordionFaqSchema';
import { Mobile as PopupBannerMobile } from 'components/Banners/PopupBanner';

import { Props } from '../helpers';

import styles from './styles.module.scss';

export const Mobile = ({ page, banners }: Props) => {
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
                  {!!page.faq.faq.length &&
                    page.faq.faq.map(({ question, answer }) => (
                      <AccordionFaqSchema
                        key={`key-${question.slice(3, 15)}`}
                        question={question}
                        isFaq
                      >
                        <div dangerouslySetInnerHTML={{ __html: answer }} />
                      </AccordionFaqSchema>
                    ))}
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
