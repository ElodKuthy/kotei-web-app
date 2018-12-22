import { auth, db } from './firebase'

export function login(username, password) {
    return auth.signInWithEmailAndPassword(username, password)
}

export function logout() {
    return auth.signOut()
}

export async function getCompanies() {
    const querySnapshot = await db.collection('companies').get()
    const gymQuerySnapshots = await Promise.all(querySnapshot.docs.map(doc => doc.ref.collection('gyms').get()))

    const companies = querySnapshot.docs.map((company, index) => ({
        id: company.id,
        ...company.data(),
        gyms: gymQuerySnapshots[index].docs.map(gym => ({ id: gym.id, ...gym.data() })),
    }))

    return companies
}