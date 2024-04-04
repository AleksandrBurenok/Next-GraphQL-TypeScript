import { Tags as TagsI } from 'interfaces/tags';

import { SITE_URL } from 'constants/env';

import Link from 'components/Link';

import styles from './styles.module.scss';

const TagArrows = ({ tags }: TagsI) => {
  return (
    <ul className={styles.tagsList}>
      {tags &&
        tags.edges.map((item) => (
          <li className={styles.tagsItem} key={item.node.id}>
            <Link href={`${SITE_URL}/tag/${item.node.slug}`}>
              <span className={styles.tags} title={item.node.name}>
                {item.node.name}
              </span>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default TagArrows;
