import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from './HooksHelper'

const getVouchers = async (token) => {
    const response = await fetch(`${BASE_URL}/vouchers`, {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + token
        },
    }).then((response) => response.json()).then(({data}) => {
        return data
    })
    return response
}

export const UseGetVouchers = (token) => {
    const { isLoading, data } = useQuery(['list-voucher', token], () => getVouchers(token))
    return { loadAsh: isLoading, data }
}