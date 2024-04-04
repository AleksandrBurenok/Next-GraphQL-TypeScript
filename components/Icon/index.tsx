import Image from 'next/image';
import clsx from 'clsx';

import { Styles } from 'interfaces/props';

import styles from './styles.module.scss';

interface Props extends Styles {
  alt: string;
  src: string;
  priority?: boolean;
}

const Icon = ({ alt, src, className, priority }: Props) => {
  return (
    <div className={styles.root}>
      <Image
        alt={alt}
        src={src}
        layout="fill"
        priority={priority}
        className={clsx(styles.image, className)}
      />
    </div>
  );
};

export default Icon;
