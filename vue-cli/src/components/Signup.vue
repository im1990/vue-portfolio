<template>

    <div class="form-wrapper">

        <h1>Create an account</h1>

        <form>
            
            <div class="form-item">
                <label for="email"></label>
                <input type="text" name="email" required="required" placeholder="Email Address" v-bind="email">
            </div>

            <div class="form-item">
                <label for="password"></label>
                <input type="password" name="password" required="required" placeholder="Password" v-bind="password">
            </div>

            <input type="text">

            <button v-on:click="addUser()">test</button>

            <input type="submit" class="button" title="Create an account" value="Create an account" >

        </form>

    </div>

</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: '',
        errorMessage: '',
        showError: false
        }
      },
       methods: {
           addUser() {
               console.log(1111)
    //         //   firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
    //         //   .then(() => {
    //         //       console.log('アカウントを作成しました')
    //         //   })
    //         //   .catch(function(error) {
    //         //     // Handle Errors here.
    //         //     var errorCode = error.code;
    //         //     var errorMessage = error.message;
    //         //     // ...
    //         //    });
    //             //router.push('home')
           }
      }
    }
    // methods: {
    //   emailLogin() {
    //     firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(reslt => {
    //       console.log(result)
    //       router.push('/home')
    //     }).catch(error => {
    //       console.log(error)
    //       this.errorMessage = error.message
    //       this.showError = true
    //     })
    //   },
    //   googleLogin(){
    //     const provider = new firebase.auth.GoogleAuthProvider()
      
    //     firebase.auth().signInWithPopup(provider).then(result => {
    //       console.log(result.user)
    //       router.push('/home')
    //     }).catch(error => {
    //       console.log(error)
    //       this.errorMessage = error.message
    //       this.showError = true
    //     })
    //   }
    // }
//   }
</script>

<style>

/* Form Layout */
.form-wrapper {
  background: #fafafa;
  margin: 3em auto;
  padding: 0 1em;
  max-width: 370px;
}

h1 {
  text-align: center;
  padding: 1em 0;
}

form {
  padding: 0 1.5em;
}

.form-item {
  margin-bottom: 0.75em;
  width: 100%;
}

.form-item input {
  background: #fafafa;
  border: none;
  border-bottom: 2px solid #e9e9e9;
  color: #666;
  font-family: 'Open Sans', sans-serif;
  font-size: 1em;
  height: 50px;
  transition: border-color 0.3s;
  width: 100%;
}

.form-item input:focus {
  border-bottom: 2px solid #c0c0c0;
  outline: none;
}

.button-panel {
  margin: 2em 0 0;
  width: 100%;
}

input {
  background: #28B9B5;
  border: none;
  color: #fff;
  cursor: pointer;
  height: 50px;
  font-family: 'Open Sans', sans-serif;
  font-size: 1.2em;
  letter-spacing: 0.05em;
  text-align: center;
  transition: background 0.3s ease-in-out;
  width: 100%;
}

.form-footer {
  font-size: 1em;
  padding: 2em 0;
  text-align: center;
}

.form-footer a {
  color: #8c8c8c;
  text-decoration: none;
  transition: border-color 0.3s;
}

.form-footer a:hover {
  border-bottom: 1px dotted #8c8c8c;
}

</style>
