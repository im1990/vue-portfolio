import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Signup from '../components/Signup.vue'
import firebase from 'firebase'

Vue.use(VueRouter)
// VueRouterインスタンスを生成
const router = new VueRouter({
    // #を消す
    mode: 'history', // historyモード

    // routingの定義
    routes: [
        {path: '/', component: Login, name: 'login'},
        {path: '/home', component: Home, name:'home'},
        {path: '/signup', component: Signup, name: 'signup'}
    ]
})

router.beforeEach((to, from, next) => {

    if(to.name === 'home') {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                next()// 通常通りルーティングさせる、無いと白紙の状態でガードがかかってしまう
                console.log(user)
            } else {
                // User is signed out.
                next({name: 'login'})
            }
        });
    } else {
        next()
    }
})


export default router

