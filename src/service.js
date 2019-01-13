function authHeader() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
        return { 'Authorization': 'Bearer ' + jwt };
    } else {
        return {};
    }
}

export async function login(userName, password) {
    const response = await fetch('https://tkm.kotei.hu/api/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
    })
    const { jwt } = await response.json()
    localStorage.setItem('jwt', jwt)
    return jwt
}

export function logout() {
    localStorage.removeItem('jwt')
}

export async function getGyms() {
    return [{ id: 1, name: 'TKM - Őr utca'}]
}

export async function getTrainings(gymId, from, to) {
    const categoryId = 1
    const response = await fetch(`https://tkm.kotei.hu/api/training?where={"$and":[${categoryId ? `{"training_category_id":${categoryId}},` : ''}{"from":{"$gte":"${from}"}},{"to":{"$lte":"${to}"}}]}&order=\`from\`%20ASC`, {
        method: 'GET',
        headers: {
            ...authHeader(),
        },
        mode: 'cors',        
    })
    return response.json()
}