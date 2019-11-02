
<!-- templateの下は1つの要素にする必要あり -->
<template>
  <div id="app">
    <router-view/>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import firebase from 'firebase'
import * as firebaseui from 'firebaseui'

  export default {
    name: 'App',
    mounted() {
      const congig = {
        callbacks: {
          signInSuccess: function(currentUser) {
            store.commit('setUser', currentUser)
            store.commit('setSignIn', true)
            return true
          },
        },
        signInFlow: 'popup',
        signInSuccessUrl: '/magazine/vue',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        tosUrl: '/category',
        privacyPolicyUrl: function() {
          window.location.assign('/top')
        }
      }

      const ui = new firebaseui.auth.AuthUI(firebase.auth())
      ui.start('#firebaseui-auth-contaner', uiConfig)

    }
  }
</script>

<style>

</style>
