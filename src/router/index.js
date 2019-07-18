import Vue from 'vue';
import Router from 'vue-router';
import View1 from 'PAGE/view1';
import View2 from 'PAGE/view2';

Vue.use(Router);
let router = new Router({
  routes: [
    {
      // 首页
      path: '/view1',
      component: View1
    },
    {
      path: '/view2',
      component: View2
    },
    { path: '*', redirect: '/view1' }
  ]
});

export default router;
