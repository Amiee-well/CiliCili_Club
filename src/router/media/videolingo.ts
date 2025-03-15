import { ROUTE_videolingo_CONVERSATION, ROUTE_videolingo_CONVERSATION_NEW } from '../constants';

export default {
  path: '/media',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'videolingo',
      name: ROUTE_videolingo_CONVERSATION_NEW,
      component: () => import('@/pages/media/videolingo.vue')
    },
    {
      path: 'videolingo/:id',
      name: ROUTE_videolingo_CONVERSATION,
      component: () => import('@/pages/media/videolingo.vue')
    }
  ]
};
