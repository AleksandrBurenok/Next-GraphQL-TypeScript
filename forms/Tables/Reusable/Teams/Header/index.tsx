import { useIntl } from 'react-intl';
import Image from 'next/image';
import clsx from 'clsx';

import Share from 'icons/Share';
import Star from 'icons/Star';

import Tooltip from 'components/Tooltip';

import styles from './styles.module.scss';

interface Props {
  handleSharePopup: () => void;
  translate_code: string;
  logo_path: string;
  isRightPart?: boolean;
  isFixture?: boolean;
  isLeaders?: boolean;
}

const Header = ({
  handleSharePopup,
  translate_code,
  logo_path,
  isRightPart = false,
  isFixture = false,
  isLeaders = false,
}: Props) => {
  const { messages } = useIntl();

  return (
    <div className={styles.header}>
      <div className={styles.partLeft}>
        <Image
          alt={translate_code}
          src={logo_path}
          width="24"
          height="24"
          layout="fixed"
        />
        <p className={styles.title}>{translate_code}</p>
      </div>
      {!isLeaders && (
        <div className={styles.wrapperLeader}>
          <div className={styles.leader}>{messages.home}</div>
          <div className={styles.leader}>{messages.result}</div>
          <div className={styles.leader}>{messages.away}</div>
        </div>
      )}
      <div
        className={clsx(
          styles.headerShare,
          isFixture && styles.headerShareFixture
        )}
      >
        <button
          type="button"
          className={styles.shareTrigger}
          onClick={handleSharePopup}
          aria-label="Share"
        >
          <Share className={styles.iconShare} />
        </button>
      </div>

      {isRightPart && !isFixture && (
        <div className={styles.partRight}>
          <Tooltip content={messages.clickExperience} direction="top">
            <Star className={styles.iconStar} />
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default Header;
