import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from './HooksHelper'

const getHistory = async (token) => {
    const response = await fetch(`${BASE_URL}/orders/histories?status=all`, {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + token
        }
    }).then((res) => res.json()).then(({data}) => {
        return data
    })
    return response
}

export const UseGetHistory = (token) => {
    const { isLoading, data } = useQuery(['history-order'], () => getHistory(token))
    return { loadAsh: isLoading, data }
}

const getget = async (token) => {
    const res = await fetch(`${BASE_URL}/orders/shows`, {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + token
        },
        body: JSON.parse({"status_delivery":"None"})
    }).then((res) => res.json()).then((data) => {
        return data
    })

    return res
}

export const UseGetGet = (token) => {
    const { data } = useQuery(['get-gett'], () => getget(token))
    return { getget: data }
}