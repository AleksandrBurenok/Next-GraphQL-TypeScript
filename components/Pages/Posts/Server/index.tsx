import { Post as PostI } from 'interfaces/post';

import Link from 'components/Link';

import styles from './styles.module.scss';

interface Proos {
  posts: PostI[];
}

const Posts = ({ posts }: Proos) => {
  return (
    <div className={styles.root}>
      <h1>Server posts</h1>
      <div className={styles.grid}>
        {posts.map((post) => {
          return (
            <Link key={post.id} href={`/${post.slug}`}>
              {post.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
