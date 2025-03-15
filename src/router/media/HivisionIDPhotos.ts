import { ROUTE_HivisionIDPhotos_CONVERSATION, ROUTE_HivisionIDPhotos_CONVERSATION_NEW } from '../constants';

export default {
  path: '/media',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'hivision_id_photos',
      name: ROUTE_HivisionIDPhotos_CONVERSATION_NEW,
      component: () => import('@/pages/media/hivision_id_photos.vue')
    },
    {
      path: 'hivision_id_photos/:id',
      name: ROUTE_HivisionIDPhotos_CONVERSATION,
      component: () => import('@/pages/media/hivision_id_photos.vue')
    }
  ]
};
