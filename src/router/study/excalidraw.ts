import { ROUTE_EXCALIDRAW_CONVERSATION, ROUTE_EXCALIDRAW_CONVERSATION_NEW } from '../constants';

export default {
  path: '/study',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'excalidraw',
      name: ROUTE_EXCALIDRAW_CONVERSATION_NEW,
      component: () => import('@/pages/study/excalidraw.vue')
    },
    {
      path: 'excalidraw/:id',
      name: ROUTE_EXCALIDRAW_CONVERSATION,
      component: () => import('@/pages/study/excalidraw.vue')
    }
  ]
};
