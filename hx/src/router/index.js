import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Test from '@/components/Test'
import Myslot from '@/components/Myslot'


import Hx from '@/components/hx/Hx'
import hxView from '@/components/hx/hxView'
import hxDetail from '@/components/hx/hxDetail'
import hxDeposit from '@/components/hx/hxDeposit'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: Login
        },
        {
            path: '/hx',
            component: Hx,
            children: [{
                    path: '/',
                    component: hxView
                },
                {
                    path: '/hx/detail',
                    component: hxDetail
                },
                {
                    path: '/hx/deposit',
                    component: hxDeposit
                },

            ]
        },
        {
            path: '/test',

            component: Test
        },
        {
            path: '/slot',

            component: Myslot
        }

    ]
})