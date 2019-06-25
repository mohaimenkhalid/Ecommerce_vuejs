// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import iziToast from 'izitoast'
import Model from './components/others/Model'

Vue.config.productionTip = false

var eventBus = new Vue();
Vue.prototype.$eventBus = eventBus;

Vue.prototype.$axios = axios;
Vue.prototype.$iziToast = iziToast;

Vue.component("model", Model);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
