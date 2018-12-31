import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Live',
    icon: 'nb-arrow-retweet',
    link: '/pages/live',
    home: false,
  },
  {
    title: 'Bluetooth',
    icon: 'nb-arrow-retweet',
    link: '/pages/bluetooth',
    home: false,
  },
  {
    title: 'Lessons',
    icon: 'nb-compose',
    children: [
      {
        title: 'Pendulum',
        link: '/auth/login',
      },
      {
        title: 'Circular Motion',
        link: '/auth/register',
      },
      {
        title: 'Velocity/time',
        link: '/auth/request-password',
      },
      {
        title: 'Trampoline',
        link: '/auth/reset-password',
      },
    ],
  },
];
