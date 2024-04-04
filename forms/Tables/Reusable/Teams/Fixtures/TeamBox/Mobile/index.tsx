import Image from 'next/image';

import { Fixture as FixtureI } from 'interfaces/fixture';

import styles from './styles.module.scss';

interface Props {
  fixture: FixtureI;
  isFixture?: boolean;
}

const TeamBoxMobile = ({ fixture, isFixture = false }: Props) => {
  return (
    <div className={styles.teamBox}>
      <div className={styles.wrapperTeam}>
        <Image
          src={fixture.localTeam.logo_path}
          alt={fixture.localTeam.translate.th.name}
          width="24"
          height="24"
          layout="fixed"
        />
        <p className={styles.teamName}>{fixture.localTeam.translate.th.name}</p>
        {!isFixture && (
          <>
            {!!fixture.localTeam.yellowcard.length && (
              <div className={styles.cardYellow}>
                {fixture.localTeam.yellowcard.length}
                <ul className={styles.cardList}>
                  {fixture.localTeam.yellowcard.map((item) => (
                    <li key={`card${item.id}`}>{item.player_name}</li>
                  ))}
                </ul>
              </div>
            )}
            {!!fixture.localTeam.redcard.length && (
              <div className={styles.cardRed}>
                {fixture.localTeam.redcard.length}
                <ul className={styles.cardList}>
                  {fixture.localTeam.redcard.map((item) => (
                    <li key={`card${item.id}`}>{item.player_name}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
      <div className={styles.wrapperTeam}>
        <Image
          src={fixture.visitorTeam.logo_path}
          alt={fixture.visitorTeam.translate.th.name}
          width="24"
          height="24"
          layout="fixed"
        />
        <p className={styles.teamName}>
          {fixture.visitorTeam.translate.th.name}
        </p>
        {!isFixture && (
          <>
            {!!fixture.visitorTeam.yellowcard.length && (
              <div className={styles.cardYellow}>
                {fixture.visitorTeam.yellowcard.length}
                <ul className={styles.cardList}>
                  {fixture.visitorTeam.yellowcard.map((item) => (
                    <li key={`card${item.id}`}>{item.player_name}</li>
                  ))}
                </ul>
              </div>
            )}
            {!!fixture.visitorTeam.redcard.length && (
              <div className={styles.cardRed}>
                {fixture.visitorTeam.redcard.length}
                <ul className={styles.cardList}>
                  {fixture.visitorTeam.redcard.map((item) => (
                    <li key={`card${item.id}`}>{item.player_name}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TeamBoxMobile;
