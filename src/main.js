// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import axios from 'axios'
import Vuex from 'vuex'
import store from "./store"; //vuex仓库
import VueResource from 'vue-resource'
Vue.use(VueResource);

//引入elementui插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './less/normalize.css';

import api, { domain } from './js/api.js';

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(Vuex);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App/>',
  render: h => h(App),
  store,
})
