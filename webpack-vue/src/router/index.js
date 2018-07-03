import vueRouter from "vue-router"
import vue from "vue"
import Daix from "components/Daix"
import Other from "components/Other"
vue.use(vueRouter)

const routes=[
{path:'/vuex',component:Daix},
{path:'/other',component:Other}
]

export default new vueRouter({
	routes
})