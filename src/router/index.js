import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
let router = new Router({
  routes: [
    {
      // 首页
      path: '/view1',
      component: () => import('CMT/view1')
    },
    {
      path: '/view2',
      component: () => import('CMT/view2')
    },
    { path: '*', redirect: '/view1' }
  ]
});

export default router;