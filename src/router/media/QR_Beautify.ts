import { ROUTE_QR_Beautify_CONVERSATION, ROUTE_QR_Beautify_CONVERSATION_NEW } from '../constants';

export default {
  path: '/media',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'qr_beautify',
      name: ROUTE_QR_Beautify_CONVERSATION_NEW,
      component: () => import('@/pages/media/qr_beautify.vue')
    },
    {
      path: 'qr_beautify/:id',
      name: ROUTE_QR_Beautify_CONVERSATION,
      component: () => import('@/pages/media/qr_beautify.vue')
    }
  ]
};
