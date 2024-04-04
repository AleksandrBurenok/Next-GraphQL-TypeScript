import { Post as PostI } from 'interfaces/post';

import Post from '../Post';

import styles from './styles.module.scss';

interface Props {
  title: string;
  post: {
    node: PostI;
  };
}

const CentralPost = ({ post, title }: Props) => {
  return (
    <div className={styles.wrapper}>
      {title && <h1 className={`red-left-flag ${styles.title}`}>{title}</h1>}
      {post && (
        <Post
          path={post.node?.slug}
          image={post.node?.featuredImage?.node}
          title={post.node?.title}
          text={post.node?.excerpt}
          tag={post.node?.tags?.edges[0]?.node?.name}
          date={post.node?.date}
          isBig={true}
        />
      )}
    </div>
  );
};

export default CentralPost;
