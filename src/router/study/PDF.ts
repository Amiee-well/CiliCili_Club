import { ROUTE_PDF_CONVERSATION, ROUTE_PDF_CONVERSATION_NEW } from '../constants';

export default {
  path: '/study',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'PDF_Conversion',
      name: ROUTE_PDF_CONVERSATION_NEW,
      component: () => import('@/pages/study/PDF.vue')
    },
    {
      path: 'PDF_Conversion/:id',
      name: ROUTE_PDF_CONVERSATION,
      component: () => import('@/pages/study/PDF.vue')
    }
  ]
};
