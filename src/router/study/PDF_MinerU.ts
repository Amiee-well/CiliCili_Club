import { ROUTE_PDF_Miner_CONVERSATION, ROUTE_PDF_Miner_CONVERSATION_NEW } from '../constants';

export default {
  path: '/study',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'PDF_MinerU',
      name: ROUTE_PDF_Miner_CONVERSATION_NEW,
      component: () => import('@/pages/study/PDF_MinerU.vue')
    },
    {
      path: 'PDF_MinerU/:id',
      name: ROUTE_PDF_Miner_CONVERSATION,
      component: () => import('@/pages/study/PDF_MinerU.vue')
    }
  ]
};
