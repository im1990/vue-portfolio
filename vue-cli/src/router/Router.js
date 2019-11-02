import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import firebase from 'firebase'

Vue.use(VueRouter)
// VueRouterインスタンスを生成
const router = new VueRouter({
    // #を消す
    mode: 'history', // historyモード

    // routingの定義
    routes: [
        {path: '/', component: Login},
        {path: '/home', component: Home}
    ]
})

router.beforeResolve((to, from, next) => {
    console.log(to)
    if(to.path === '/') {
        next()
    } else {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                console.log('認証中')
                next()
            } else {
                console.log('未認証')
                next({path: '/'})
            }
        })
    }
})

export default router

