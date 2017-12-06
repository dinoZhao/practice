import vueRouter from 'vue-router'
import Vue from 'vue'
import counter from '../components/counter'
//Vue.config.productionTip = false
Vue.use(vueRouter)

const Foo={template:'<div>foo</div>'};
const Bar={template:'<div>bar</div>'};


console.log(counter)
const routes=[
{path:'/foo',component:counter},
{path:'/bar',component:Bar}
]

export default new vueRouter({
	routes
})
