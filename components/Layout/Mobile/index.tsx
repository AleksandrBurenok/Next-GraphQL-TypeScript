import { ReactNode } from 'react';

import { PageMenu as PageMenuI } from 'interfaces/menu';

import Wrapper from 'components/Page/Wrapper';

import Footer from '../Mobile/Footer';
import Header from '../Mobile/Header';

import styles from './styles.module.scss';

interface Props {
  children: ReactNode;
  menu: PageMenuI;
}

const defaultData = {
  footer: [],
  main: [],
  mainRight: [],
  sub: [],
};

function Mobile({ children, menu = defaultData }: Props) {
  return (
    <div className={styles.root}>
      <Header menu={menu} />
      <Wrapper>
        <main className={styles.main}>{children}</main>
      </Wrapper>
      <Footer data={menu.footer} />
    </div>
  );
}

export default Mobile;
