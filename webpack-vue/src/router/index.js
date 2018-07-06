import vueRouter from "vue-router"
import vue from "vue"
import Daix from "components/Daix"
import Other from "components/Other"
import Child from "components/Child"
import Prop from "components/Prop"
import Slots from "components/Slots"

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
},
{path:'/prop',component:Prop},
{path:'/slot',component:Slots},
]
var router=new vueRouter({
	routes
})
router.beforeEach((to, from, next) => {
//console.log("")
  next()
})
export default router