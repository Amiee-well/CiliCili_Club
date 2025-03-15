import {
  ROUTE_Video_Trending_Generator_CONVERSATION,
  ROUTE_Video_Trending_Generator_CONVERSATION_NEW
} from '../constants';

export default {
  path: '/media',
  component: () => import('@/layouts/Service.vue'),
  children: [
    {
      path: 'video_trending_generator',
      name: ROUTE_Video_Trending_Generator_CONVERSATION_NEW,
      component: () => import('@/pages/media/video_trending_generator.vue')
    },
    {
      path: 'video_trending_generator/:id',
      name: ROUTE_Video_Trending_Generator_CONVERSATION,
      component: () => import('@/pages/media/video_trending_generator.vue')
    }
  ]
};
