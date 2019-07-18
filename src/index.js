// page
import 'STYLE/style.scss'
import Vue from 'vue';
import router from 'ROUTER/index.js';
import store from 'VUEX/index.js';
import App from './App';


new Vue({
  el: '#root',
  router,
  store,
  render: h => h(App)
});

 