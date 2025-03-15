import { ROUTE_MagicQuill_CONVERSATION, ROUTE_MagicQuill_CONVERSATION_NEW } from '../constants';

export default {
  path: '/media',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'magicquill',
      name: ROUTE_MagicQuill_CONVERSATION_NEW,
      component: () => import('@/pages/media/magicquill.vue')
    },
    {
      path: 'magicquill/:id',
      name: ROUTE_MagicQuill_CONVERSATION,
      component: () => import('@/pages/media/magicquill.vue')
    }
  ]
};
