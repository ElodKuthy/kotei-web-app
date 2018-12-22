import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import config from './firebase.config'
  
firebase.initializeApp(config)

export const auth = firebase.auth()

export const db = firebase.firestore()

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
})
