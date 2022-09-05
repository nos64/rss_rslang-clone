export const ROUTES = {
  LAYOUT: '/',
  MAIN: '',
  TEXTBOOK: 'textbook',
  AUDIOCHALLENGE: 'audioChallenge',
  SPRINT: 'sprint',
  STATS: 'stats',
};

export const pages = [
  {
    text: 'Главная',
    link: ROUTES.MAIN,
    isAuth: false,
    icon: 'Home',
    footerHide: false,
  },
  {
    text: 'Учебник',
    link: ROUTES.TEXTBOOK,
    isAuth: false,
    icon: 'MenuBook',
    footerHide: false,
  },
  {
    text: 'Аудиовызов',
    link: ROUTES.AUDIOCHALLENGE,
    isAuth: false,
    icon: 'Headphones',
    footerHide: true,
  },
  {
    text: 'Спринт',
    link: ROUTES.SPRINT,
    isAuth: false,
    icon: 'AccessAlarm',
    footerHide: true,
  },
  {
    text: 'Статистика',
    link: ROUTES.STATS,
    isAuth: true,
    icon: 'BarChart',
    footerHide: false,
  },
];
