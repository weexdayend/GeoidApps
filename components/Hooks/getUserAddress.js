import { useQuery } from '@tanstack/react-query'

const url = 'https://geoid-dev.taktikid.com/api/users/'
const getUserAddress = async (id, token) => {
    const response = await fetch(url+id+'/address', {
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