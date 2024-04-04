import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from '@apollo/client';

import { handlePostsResponse } from 'response/handlers/posts';

import { Post as PostI } from 'interfaces/post';

import { pagesListQuery } from 'queries/posts';

import Post from '../Post';

import styles from './styles.module.scss';

const MoreNews = () => {
  const { messages } = useIntl();

  const { data, error, loading } = useQuery(pagesListQuery({ first: 4 }));

  const posts = useMemo(() => handlePostsResponse(data), [data]);

  if (error) {
    return <div />;
  }

  if (loading) {
    return <div />;
  }

  return (
    <div className={styles.moreNews}>
      <p className="red-left-flag">{messages.moreNews}</p>
      {!!posts.length &&
        posts.map(
          ({
            id,
            slug,
            title,
            date,
            featuredImage,
            excerpt,
            tags,
            author,
          }: PostI) => (
            <div className={styles.moreNewsPost} key={id}>
              <Post
                path={slug}
                image={featuredImage?.node}
                title={title}
                text={excerpt}
                tag={tags?.edges[0]?.node.name}
                date={date}
                author={author.node.name}
                isMoreNews={true}
              />
            </div>
          )
        )}
    </div>
  );
};

export default MoreNews;
