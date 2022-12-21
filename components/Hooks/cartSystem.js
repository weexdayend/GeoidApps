import { useQuery, useMutation } from '@tanstack/react-query'

const cartUrl = 'https://geoid-dev.taktikid.com/api/carts'
const options = (method, id, type, token) => {
    let headers = {}
    let body = { productId: id, typeProduct: type, item: '1' }

    switch(method){
        case 'POST' :
        return headers = {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + token
            },
            body: JSON.stringify(body)
        }
        case 'DELETE' :
        // Encode from json to EncodedURIComponents
        // var formBody = []
        // for (var property in body) {
        //     var encodedKey = encodeURIComponent(property)
        //     var encodedValue = encodeURIComponent(body[property])
        //     formBody.push(encodedKey + "=" + encodedValue)
        // }
        // formBody = formBody.join("&")

        // The ES6 way to convert json body to encodeduri
        const formBody = Object.keys(body).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&')
        // End the encoded here

        return headers = {
            method: 'DELETE',
            headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : 'Bearer ' + token
            },
            body: formBody
        }
    }
}

const getCart = async (token) => {
    const response = await fetch(cartUrl, {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + token
        }
    })
    .then((response) => response.json()).then(({data}) => {
        return data
    })
    return response
}

export const UseGetCart = (token) => {
    const { isLoading, data } = useQuery(['user-cart'], () => getCart(token))
    return { loadAsh: isLoading, data }
}

const addCart = async ({id, type, token}) => {
    const response = await fetch(cartUrl+'/add', options('POST', id, type, token))
    .then((response) => response.json()).then((json) => {
        return json
    })
    return response
}

export const UseAddCart = () => {
    const { mutate } = useMutation(['add-cart'], {
        mutationFn: (data) => addCart(data)
    })
    return { addItem: mutate }
}

const deleteCart = async ({id, type, token}) => {
    const response = await fetch(cartUrl+'/dell', options('DELETE', id, type, token))
    .then((response) => response.json()).then((json) => {
        return json
    })
    return response
}

export const UseDeleteCart = () => {
    const { mutate } = useMutation(['delete-cart'], {
        mutationFn: (data) => deleteCart(data)
    })
    return { deleteItem: mutate }
}