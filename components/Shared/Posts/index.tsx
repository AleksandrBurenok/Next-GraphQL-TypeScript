import clsx from 'clsx';

import { Post as PostI } from 'interfaces/post';
import { Banner as BannerI } from 'interfaces/banners';

import Post from '../Post';

import styles from './styles.module.scss';

interface Props {
  title?: string;
  posts: {
    node: PostI;
  }[];
  isCentral?: boolean;
  twoColumns?: boolean;
  oneColumn?: boolean;
  banners?: BannerI[];
  isHighlights?: boolean;
  isSearch?: boolean;
}

const Posts = ({
  posts,
  title,
  twoColumns,
  oneColumn,
  banners = [],
  isHighlights,
  isSearch,
}: Props) => {
  const filteredPosts = posts.map((post, index) => {
    const filteredBanners = banners
      ? banners.filter((entity, i) => i === index && entity)
      : [];

    if (filteredBanners.length) {
      post.node.banner = filteredBanners[0];
    }

    return post;
  });

  return (
    <div className={styles.wrapper}>
      {title && <p className="red-left-flag">{title}</p>}
      <ul className={clsx(styles.list, isSearch && styles.listSearch)}>
        {filteredPosts.map((item) => {
          return (
            <li
              className={clsx(
                styles.listItem,
                twoColumns && styles.twoColumns,
                oneColumn && styles.oneColumn
              )}
              key={item.node.id}
            >
              <Post
                path={item.node?.slug}
                image={item.node?.featuredImage?.node}
                title={item.node?.title}
                text={item.node?.excerpt}
                tag={item.node?.tags?.edges[0]?.node?.name}
                date={item.node?.date}
                banner={item.node?.banner}
                isHighlights={isHighlights}
                author={item.node?.author?.node.name}
                isSearch={isSearch}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Posts;
