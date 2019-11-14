
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

  }
</script>

<style>

</style>
