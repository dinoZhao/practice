// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store'
console.log(store)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
template: '<App/>',
components: { App }
})
