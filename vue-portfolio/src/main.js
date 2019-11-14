import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router/Router.js'
// import store from './store.js'
import firebase from 'firebase'
import 'firebase/auth'

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
  apiKey: "AIzaSyCtcstXqRl_tJn5AnLkzxzpq90SPHwOcYc",
  authDomain: "budget-manager-29d60.firebaseapp.com",
  databaseURL: "https://budget-manager-29d60.firebaseio.com",
  projectId: "budget-manager-29d60",
  storageBucket: "budget-manager-29d60.appspot.com",
  messagingSenderId: "602334045752",
  appId: "1:602334045752:web:13ba06bcf4baddbaade8cd"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// var db = firebase.firestore();

// Fontawesome
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
//   store,
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

export var db = firebase.firestore();
