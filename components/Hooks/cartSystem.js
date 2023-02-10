import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { BASE_URL } from './HooksHelper'

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
    const response = await fetch(`${BASE_URL}/carts`, {
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
    const { isLoading, data, isSuccess, isRefetching } = useQuery(['user-cart'], () => getCart(token))
    return { loadAsh: isLoading, data, isSuccess, isRefetching }
}

const addCart = async ({id, type, token}) => {
    const response = await fetch(`${BASE_URL}/carts/add`, options('POST', id, type, token))
    .then((response) => response.json()).then((json) => {
        return json
    })
    return response
}

export const UseAddCart = () => {
    const clientQuery = useQueryClient()

    const { mutate, status } = useMutation({
        mutationFn: (data) => addCart(data),
        onSuccess: () => {
            return clientQuery.invalidateQueries({
                queryKey: ['user-cart'],
            })
        }
    })
    return { addItem: mutate, statusAdd: status }
}

const deleteCart = async ({id, type, token}) => {
    const response = await fetch(`${BASE_URL}/carts/dell`, options('DELETE', id, type, token))
    .then((response) => response.json()).then((json) => {
        return json
    })
    return response
}

export const UseDeleteCart = () => {
    const clientQuery = useQueryClient()

    const { mutate, status } = useMutation({
        mutationFn: (data) => deleteCart(data),
        onSuccess: () => {
            return clientQuery.invalidateQueries({
                queryKey: ['user-cart'],
            })
        }
    })
    return { deleteItem: mutate, statusDelete: status }
}