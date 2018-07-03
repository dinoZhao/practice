import vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
var vm=new vue({
	el: '#app',
template: '<App/>',
components: { App },
store,
router
})
