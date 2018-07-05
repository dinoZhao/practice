import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import Mix from "components/Mix"
Vue.config.optionMergeStrategies.filters = function (parent, child, vm) {
  return [parent,child,vm]
}
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  },
  components:{
  	Mix
  }
})

var vm=new Vue({
	el: '#app',
template: '<App/>',
components: { App },
store,
router,

})

