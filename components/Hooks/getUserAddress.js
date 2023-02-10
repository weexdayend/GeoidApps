import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { BASE_URL } from './HooksHelper'

const getUserAddress = async (id, token) => {
    const response = await fetch(`${BASE_URL}/users/${id}/address`, {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + token
        }
    }).then((response) => response.json()).then(({data}) => {
        return data
    })

    return response
}

export const UseGetUserAddress = (id, token) => {
    const { isLoading, data } = useQuery(['user-address'], () => getUserAddress(id, token))
    return { loadAsh: isLoading, data }
}

const addUserAddress = async ({data, token}) => {
    const formBody = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&')

    const response = await fetch(`${BASE_URL}/users/address`, {
        method: 'POST',
        headers: {
            Accept: 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : 'Bearer ' + token
        },
        body: formBody
    }).then((response) => response.json()).then((res) => {
        return res
    })

    return response
}

export const UseAddUserAddress = () => {
    const clientQuery = useQueryClient()

    const { mutate,  isSuccess } = useMutation({
        mutationFn: (data) => addUserAddress(data),
        onSuccess: () => {
            return clientQuery.invalidateQueries({
                queryKey: ['user-address']
            })
        }
    })

    return { mutate, isSuccess }
}