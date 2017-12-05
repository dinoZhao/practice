import vueRouter from 'vue-router'
import Vue from 'vue'
//Vue.config.productionTip = false
Vue.use(vueRouter)

const Foo={template:'<div>foo</div>'};
const Bar={template:'<div>bar</div>'};



const routes=[
{path:'/foo',component:Foo},
{path:'/bar',component:Bar}
]

export default new vueRouter({
	routes
})
