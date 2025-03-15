import { ROUTE_MusicGen_CONVERSATION, ROUTE_MusicGen_CONVERSATION_NEW } from '../constants';

export default {
  path: '/media',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'musicgen',
      name: ROUTE_MusicGen_CONVERSATION_NEW,
      component: () => import('@/pages/media/musicgen.vue')
    },
    {
      path: 'musicgen/:id',
      name: ROUTE_MusicGen_CONVERSATION,
      component: () => import('@/pages/media/musicgen.vue')
    }
  ]
};
