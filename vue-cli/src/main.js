import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router/Router.js'
import firebase from './firebase'
import 'firebase/auth'

// firebase.init()
// firebase.onAuth()


import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab); // アイコンを読み込み
Vue.component('v-fa', FontAwesomeIcon); // Vueコンポーネントを作成
library.add(faUserSecret)
Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
}).$mount('#app')

Vue.use(Vuex)
export default new Vuex.Store({
    // 保持したい状態を設定
    state: {
        user: {},
        isSignIn: false
    },
    // stateを変更するための関数
    mutations: {
        setUser(state, user) {
            state.user = user; //firebaseが返したユーザー情報
        },
        setSignIn(state, isSignIn) {
            state.isSignIn = isSignIn; //ログインしてるかどうか true or false
        }
    },
    // stateの値を取得する関数
    getters: {
        user(state) {
            return state.user;
        },
        isSignIn(state) {
            return state.isSignIn;
        }
    }
});
