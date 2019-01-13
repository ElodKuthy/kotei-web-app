import { auth, db } from './firebase'

export function login(username, password) {
    return auth.signInWithEmailAndPassword(username, password)
}

export function logout() {
    return auth.signOut()
}

export async function getGyms() {
    const gyms = await db.collection('gyms').orderBy('name').get()
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

export async function getLocations(gymId) {
    const locations = await db.collection('gyms').doc(gymId).collection('locations').orderBy('name').get()
    return locations.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export async function getTrainingTypes(gymId) {
    const trainingTypes = await db.collection('gyms').doc(gymId).collection('trainingTypes').orderBy('name').get()
    return trainingTypes.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export async function getCoaches(gymId) {
    const coaches = await db.collection('gyms').doc(gymId).collection('users').where('coach', '==', true).orderBy('name').get()
    return coaches.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export async function getTrainings(gymId, from, to) {
    const trainings = await db.collection('gyms').doc(gymId).collection('trainings').where('from', '>=', from).where('from', '<=', to).orderBy('from').get()
    return trainings.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}