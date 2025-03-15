import {
  ROUTE_video_remove_background_CONVERSATION,
  ROUTE_video_remove_background_CONVERSATION_NEW
} from '../constants';

export default {
  path: '/media',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'video_remove_background',
      name: ROUTE_video_remove_background_CONVERSATION_NEW,
      component: () => import('@/pages/media/video_remove_background.vue')
    },
    {
      path: 'video_remove_background/:id',
      name: ROUTE_video_remove_background_CONVERSATION,
      component: () => import('@/pages/media/video_remove_background.vue')
    }
  ]
};
