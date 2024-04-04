import { Messages } from 'interfaces/intl';

import { Social } from 'enums/social';

import Facebook from 'icons/Facebook';
import Twitter from 'icons/Twitter';
import Instagram from 'icons/Instagram';
import Line from 'icons/Line';

export const socials = (messages: Messages) => [
  {
    href: Social.FACEBOOK_TH,
    key: 'facebook_th',
    title: messages.facebookTH,
    icon: Facebook,
  },
  {
    href: Social.FACEBOOK_COMMUNITY,
    key: 'facebook_community',
    title: messages.facebookCommunity,
    icon: Facebook,
  },
  {
    href: Social.TWITTER,
    key: 'twitter',
    title: messages.twitter,
    icon: Twitter,
  },
  {
    href: Social.INSTAGRAM,
    key: 'instagram',
    title: messages.instagram,
    icon: Instagram,
  },
  {
    href: Social.LINE,
    key: 'line',
    title: messages.line,
    icon: Line,
  },
];
