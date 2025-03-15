import {
  ROUTE_video_background_removal_CONVERSATION,
  ROUTE_video_background_removal_CONVERSATION_NEW
} from '../constants';

export default {
  path: '/media',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'video_background_removal',
      name: ROUTE_video_background_removal_CONVERSATION_NEW,
      component: () => import('@/pages/media/video_background_removal.vue')
    },
    {
      path: 'video_background_removal/:id',
      name: ROUTE_video_background_removal_CONVERSATION,
      component: () => import('@/pages/media/video_background_removal.vue')
    }
  ]
};
