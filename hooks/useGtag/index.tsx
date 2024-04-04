import { useEffect } from 'react';

import * as gtag from 'lib/gtag';

const useGtag = (author: string) => {
  useEffect(() => {
    gtag.event({
      action: 'PostInformation',
      author: author,
    });
  });
};

export default useGtag;
