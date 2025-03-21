import { ROUTE_hoppscotch_CONVERSATION, ROUTE_hoppscotch_CONVERSATION_NEW } from '../constants';

export default {
  path: '/study',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'hoppscotch',
      name: ROUTE_hoppscotch_CONVERSATION_NEW,
      component: () => import('@/pages/study/hoppscotch.vue')
    },
    {
      path: 'hoppscotch/:id',
      name: ROUTE_hoppscotch_CONVERSATION,
      component: () => import('@/pages/study/hoppscotch.vue')
    }
  ]
};
