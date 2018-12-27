import { auth, db } from './firebase'

export function login(username, password) {
    return auth.signInWithEmailAndPassword(username, password)
}

export function logout() {
    return auth.signOut()
}

export async function getGyms() {
    const querySnapshot = await db.collection('gyms').get()
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export async function getUser(id) {
    const doc = await db.collection('users').doc(id).get()
    return doc.data()
}