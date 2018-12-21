import firebase from 'firebase/app'
import 'firebase/auth'

export function login(username, password) {
    return firebase.auth().signInWithEmailAndPassword(username, password)
}

export function logout() {
    return firebase.auth().signOut()
}
