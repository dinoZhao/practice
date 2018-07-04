import vueRouter from "vue-router"
import vue from "vue"
import Daix from "components/Daix"
import Other from "components/Other"
import Child from "components/Child"
vue.use(vueRouter)
var Bar={ template: '<div>bar</div>' }
var Foo={ template: '<div>foo</div>' }
const routes=[
{path:'/vuex',component:Daix},
{path:'/other/:id',component:Other},
{path:'/child',component:Child,
children:[
{path:'',component:Bar},
{path:'bar',component:Bar},
{path:'foo',component:Foo},
]
}
]

export default new vueRouter({
	routes
})