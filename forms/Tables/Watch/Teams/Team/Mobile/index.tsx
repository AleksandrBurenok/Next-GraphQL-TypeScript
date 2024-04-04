import { useState } from 'react';
import { useIntl } from 'react-intl';

import { Props } from '../helpers';
import TeamBoxMobile from '../../TeamBox/Mobile';

import styles from './styles.module.scss';

const TeamMobile = ({ game }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { messages } = useIntl();

  const handleShowLinks = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.team}>
      <button
        type="button"
        className={styles.wrapperBtn}
        key={game.league}
        onClick={handleShowLinks}
      >
        <TeamBoxMobile game={game} />
      </button>
      {isOpen && (
        <div className={styles.wrapperLinks}>
          <p className={styles.titleLinks}>{messages.chooseLinkToView}:</p>
          <ul className={styles.listLinks}>
            {game.links.map((entity) => (
              <li key={`${entity.link}-${entity.title}`}>
                <noindex>
                  <a
                    className={styles.link}
                    href={entity.link}
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    {entity.title}
                  </a>
                </noindex>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TeamMobile;
