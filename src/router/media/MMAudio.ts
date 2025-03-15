import { ROUTE_MMAudio_CONVERSATION, ROUTE_MMAudio_CONVERSATION_NEW } from '../constants';

export default {
  path: '/media',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'mmaudio',
      name: ROUTE_MMAudio_CONVERSATION_NEW,
      component: () => import('@/pages/media/mmaudio.vue')
    },
    {
      path: 'mmaudio/:id',
      name: ROUTE_MMAudio_CONVERSATION,
      component: () => import('@/pages/media/mmaudio.vue')
    }
  ]
};
