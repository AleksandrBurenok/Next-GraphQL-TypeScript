import Head from 'next/head';

import { FACEBOOK_ID_APP } from 'constants/id';
import { SITE_URL } from 'constants/env';

import { Regions } from 'enums/regions';

import { Seo as SeoI } from 'interfaces/seo';

const Seo = ({
  title,
  metaDesc,
  opengraphTitle,
  opengraphImage,
  opengraphDescription,
  metaKeywords,
  schema,
  twitterTitle,
  twitterDescription,
  twitterImage,
  path,
}: SeoI) => {
  const customUrl = `${SITE_URL}/${path}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={metaDesc || opengraphDescription} />
      <link rel="canonical" href={customUrl} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="alternate" href={`${SITE_URL}/`} hrefLang="x-default" />
      <link rel="alternate" href={Regions.en} hrefLang="en" />
      <link rel="alternate" href={Regions.hi} hrefLang="hi" />
      {opengraphImage && <meta name="image" content={opengraphImage.guid} />}
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      <meta property="og:url" content={customUrl} />
      <meta property="og:title" content={opengraphTitle} />
      <meta property="og:description" content={opengraphDescription} />
      {opengraphImage && (
        <meta property="og:image" content={opengraphImage.guid} />
      )}
      <meta property="og:type" content="article" />
      <meta property="fb:app_id" content={FACEBOOK_ID_APP} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      {twitterImage && (
        <meta name="twitter:image" content={twitterImage.guid} />
      )}
      {schema && <script type="application/ld+json">{schema.raw}</script>}
    </Head>
  );
};

export default Seo;
