import { Keys } from 'enums/screenWidth';

export interface ScreenWidth {
  [Keys.width]: number;
  [Keys.height]: number;
  [Keys.isDesktop]: boolean;
  [Keys.isMobile]: boolean;
}
