import Image from 'next/image';
import { useIntl } from 'react-intl';

import { H2h as H2hI } from 'interfaces/fixture';

import Dialog from 'components/Dialog';
import Button from 'components/Shared/Button';

import styles from './styles.module.scss';

interface Props {
  onClose: () => void;
  h2h: H2hI;
}

const H2h = ({ onClose, h2h }: Props) => {
  const { messages } = useIntl();

  return (
    <Dialog
      open
      onClose={onClose}
      classes={{
        paper: styles.paper,
      }}
    >
      <div className={styles.wrapperTitle}>
        <span className={styles.title}>หมดเวลาการแข่งขัน</span>
      </div>
      <div className={styles.header}>
        <div className={styles.localTeam}>
          <div className={styles.wrapperTeam}>
            <div className={styles.teamName}>
              {h2h.localTeam.translate.th.name}
            </div>
            <Image
              src={h2h.localTeam.logo_path}
              alt={h2h.localTeam.translate.th.name}
              width="50"
              height="50"
              layout="fixed"
            />
          </div>
          <div className={styles.score}>{h2h.data.stats.localteam.goals}</div>
        </div>
        <div className={styles.divider}>-</div>
        <div className={styles.visitorTeam}>
          <div className={styles.score}>{h2h.data.stats.visitorteam.goals}</div>
          <div className={styles.wrapperTeam}>
            <Image
              src={h2h.visitorTeam.logo_path}
              alt={h2h.visitorTeam.translate.th.name}
              width="50"
              height="50"
              layout="fixed"
            />
            <div className={styles.teamName}>
              {h2h.visitorTeam.translate.th.name}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.events}>
        <div className={styles.event}>
          <div className={styles.localTeam}>
            <div className={styles.matchTeam}>
              {h2h.data.stats.localteam.all}
            </div>
          </div>
          <div className={styles.matchResult}>อ่ยู่เสมอ,อยู่เรื่อยไป</div>
          <div className={styles.visitorTeam}>
            <div className={styles.matchTeam}>
              {h2h.data.stats.visitorteam.all}
            </div>
          </div>
        </div>

        <div className={styles.event}>
          <div className={styles.localTeam}>
            <div className={styles.matchTeam}>
              {h2h.data.stats.localteam.win}
            </div>
          </div>
          <div className={styles.matchResult}>Win</div>
          <div className={styles.visitorTeam}>
            <div className={styles.matchTeam}>
              {h2h.data.stats.visitorteam.win}
            </div>
          </div>
        </div>

        <div className={styles.event}>
          <div className={styles.localTeam}>
            <div className={styles.matchTeam}>
              {h2h.data.stats.localteam.draw}
            </div>
          </div>
          <div className={styles.matchResult}>Draw</div>
          <div className={styles.visitorTeam}>
            <div className={styles.matchTeam}>
              {h2h.data.stats.visitorteam.draw}
            </div>
          </div>
        </div>

        <div className={styles.event}>
          <div className={styles.localTeam}>
            <div className={styles.matchTeam}>
              {h2h.data.stats.localteam.lose}
            </div>
          </div>
          <div className={styles.matchResult}>Lose</div>
          <div className={styles.visitorTeam}>
            <div className={styles.matchTeam}>
              {h2h.data.stats.visitorteam.lose}
            </div>
          </div>
        </div>

        <div className={styles.event}>
          <div className={styles.localTeam}>
            <div className={styles.matchTeam}>
              {h2h.data.stats.localteam.goals}
            </div>
          </div>
          <div className={styles.matchResult}>Score a goal</div>
          <div className={styles.visitorTeam}>
            <div className={styles.matchTeam}>
              {h2h.data.stats.visitorteam.goals}
            </div>
          </div>
        </div>
      </div>
      <Button type="button" onClick={onClose} className={styles.btn}>
        {messages.close}
      </Button>
    </Dialog>
  );
};

export default H2h;
