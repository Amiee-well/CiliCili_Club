import { ROUTE_LTX_CONVERSATION, ROUTE_LTX_CONVERSATION_NEW } from '../constants';

export default {
  path: '/media',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'ltx',
      name: ROUTE_LTX_CONVERSATION_NEW,
      component: () => import('@/pages/media/ltx.vue')
    },
    {
      path: 'ltx/:id',
      name: ROUTE_LTX_CONVERSATION,
      component: () => import('@/pages/media/ltx.vue')
    }
  ]
};
