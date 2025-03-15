import { ROUTE_PDF_Translate_CONVERSATION, ROUTE_PDF_Translate_CONVERSATION_NEW } from '../constants';

export default {
  path: '/study',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'pdf_translate',
      name: ROUTE_PDF_Translate_CONVERSATION_NEW,
      component: () => import('@/pages/study/pdf_translate.vue')
    },
    {
      path: 'pdf_translate/:id',
      name: ROUTE_PDF_Translate_CONVERSATION,
      component: () => import('@/pages/study/pdf_translate.vue')
    }
  ]
};
