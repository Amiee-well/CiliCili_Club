import { ROUTE_ScreenShot2Code_CONVERSATION, ROUTE_ScreenShot2Code_CONVERSATION_NEW } from '../constants';

export default {
  path: '/study',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'ScreenShot2Code',
      name: ROUTE_ScreenShot2Code_CONVERSATION_NEW,
      component: () => import('@/pages/study/ScreenShot2Code.vue')
    },
    {
      path: 'ScreenShot2Code/:id',
      name: ROUTE_ScreenShot2Code_CONVERSATION,
      component: () => import('@/pages/study/ScreenShot2Code.vue')
    }
  ]
};
