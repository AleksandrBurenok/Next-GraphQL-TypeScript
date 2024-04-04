import { useState, useEffect, useMemo } from 'react';

import { Post as PostI } from 'interfaces/post';

import {
  getSocialUrl,
  getCategoryName,
  getCategoryUrl,
  getCategorySlug,
} from 'components/Pages/Highlight/helpers';

interface Props {
  page: PostI;
}

const useHighlight = ({ page }: Props) => {
  const [files, setFiles] = useState(['', '', '']);

  const socialUrl = useMemo(() => getSocialUrl(page.slug), [page.slug]);

  const categoryName = getCategoryName(page);
  const categoryUrl = getCategoryUrl(page);
  const categorySlug = getCategorySlug(page);

  const handleVideoChange1 = () => {
    setFiles([page.highlights.reserveEmbed1, '', '']);
  };

  const handleVideoChange2 = () => {
    setFiles(['', page.highlights.reserveEmbed2, '']);
  };

  useEffect(() => {
    setFiles(['', '', page.highlights.reserveEmbed3]);
  }, [page.highlights.reserveEmbed3]);

  return {
    files,
    socialUrl,
    categoryName,
    categoryUrl,
    categorySlug,
    handleVideoChange1,
    handleVideoChange2,
  };
};

export default useHighlight;
