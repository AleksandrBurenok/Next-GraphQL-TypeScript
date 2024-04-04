import { Keys } from 'enums/contactUs';

export interface ContactUs {
  [Keys.name]: string;
  [Keys.topic]: string;
  [Keys.message]: string;
  [Keys.email]: string;
  [Keys.nonce]: string;
}
