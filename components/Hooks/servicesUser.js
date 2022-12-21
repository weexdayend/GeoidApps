const loginUrl = 'https://geoid.taktikid.com/api/users/'

export const login = async (data) => {   
    const response = await fetch(loginUrl+'login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((res) => res.json()).then((json) => {
        return json
    })
    return response
}

export const logout = async (token) => {
    const response = await fetch(loginUrl+'logout', {
        method: 'POST',
        headers: {
            'Authorization' : 'Bearer ' + token
        }
    }).then((res) => res.json()).then((json) => {
        return json
    })
    return response
}