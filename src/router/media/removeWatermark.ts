import { ROUTE_removeWatermark_CONVERSATION, ROUTE_removeWatermark_CONVERSATION_NEW } from '../constants';

export default {
  path: '/media',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'remove_watermark',
      name: ROUTE_removeWatermark_CONVERSATION_NEW,
      component: () => import('@/pages/media/remove_watermark.vue')
    },
    {
      path: 'remove_watermark/:id',
      name: ROUTE_removeWatermark_CONVERSATION,
      component: () => import('@/pages/media/remove_watermark.vue')
    }
  ]
};
