import clsx from 'clsx';

import { Styles } from 'interfaces/props';

import styles from './styles.module.scss';

interface Props extends Styles {
  title?: string;
  content: string;
  isResults?: boolean;
}

const SeoBlock = ({ title, content, className, isResults = false }: Props) => (
  <div className={clsx(styles.root, className)}>
    {title && !isResults ? (
      <h2 className={clsx('red-left-flag', styles.title)}>{title}</h2>
    ) : (
      title && <h1 className={clsx('red-left-flag', styles.title)}>{title}</h1>
    )}
    {content && (
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )}
  </div>
);

export default SeoBlock;
