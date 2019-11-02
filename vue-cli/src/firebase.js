import firebase from 'firebase'

if(!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "api-key",
        authDomain: "project-id.firebaseapp.com",
        databaseURL: "https://portfolio-edcaf.firebaseio.com",
        projectId: "portfolio-edcaf",
        storageBucket: "portfolio-edcaf.appspot.com",
        messagingSenderId: "472597696067",
        appID: "1:472597696067:web:4a00d7a521481eda000ef6",
    })
}

export default firebase

// export default {
//     init() {
//         firebase.initializeApp(config)
//         firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
//     },
//     logout() {
//         firebase.auth().signOut()
//     },
//     onAuth() {
//         firebase.auth().onAuthStateChanged(uder => {
//             user = user ? user : []
//             store.commit('setUser', user)
//             store.commit('setSignIn', user.uid ? true : false)
//         })
//     }
// }