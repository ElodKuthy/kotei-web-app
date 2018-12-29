import { auth, db } from './firebase'

export function login(username, password) {
    return auth.signInWithEmailAndPassword(username, password)
}

export function logout() {
    return auth.signOut()
}

export async function getGyms(uid) {
    const gyms = await db.collection('gyms').get()
    return gyms.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export async function getRoles(uid) {
    const gyms = await db.collection('gyms').get()
    const roles = await Promise.all(gyms.docs.map(doc => doc.ref.collection('users').doc(uid).get()))
    return gyms.docs
        .map((doc, index) => ({ gymId: doc.id, roles: roles[index] }))
        .filter(({ roles }) => roles.exists)
        .map(({ gymId, roles }) => ({ gymId, ...roles.data() }))
}