import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
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
        link: '/pages/pendulum',
      },
      {
        title: 'Circular Motion',
        link: '/pages/circular-motion',
      },
      {
        title: 'Sprinting',
        link: '/pages/sprinting',
      },
      {
        title: 'Trampoline',
        link: '/pages/trampoline',
      },
    ],
  },
];
