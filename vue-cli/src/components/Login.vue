<template>

    <div class="form-wrapper">

        <h1>Sign In</h1>

        <form>
            <div class="form-item">
                <label for="email"></label>
                <input type="email" name="email" required="required" placeholder="Email Address">
            </div>

            <div class="form-item">
                <label for="password"></label>
                <input type="password" name="password" required="required" placeholder="Password">
            </div>

            <router-link to="/home" class="button-panel">
                <input type="submit" class="button" title="Sign In" value="Sign In">
            </router-link>

        </form>

        <div class="form-footer">
            <p><a href="#">Create an account</a></p>
            <p><a href="#">Forgot password?</a></p>
        </div>

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
      emailLogin() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(reslt => {
          console.log(result)
          router.push('/home')
        }).catch(error => {
          console.log(error)
          this.errorMessage = error.message
          this.showError = true
        })
      },
      googleLogin(){
        const provider = new firebase.auth.GoogleAuthProvider()
      
        firebase.auth().signInWithPopup(provider).then(result => {
          console.log(result.user)
          router.push('/home')
        }).catch(error => {
          console.log(error)
          this.errorMessage = error.message
          this.showError = true
        })
      }
    }
  }
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

.button-panel .button {
  background: #28B9B5;
  border: none;
  color: #fff;
  cursor: pointer;
  height: 50px;
  font-family: 'Open Sans', sans-serif;
  font-size: 1.2em;
  letter-spacing: 0.05em;
  text-align: center;
  text-transform: uppercase;
  transition: background 0.3s ease-in-out;
  width: 100%;
}

.button:hover {
  background: #28B9B5;
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
