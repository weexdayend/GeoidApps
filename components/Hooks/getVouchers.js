import { useQuery } from '@tanstack/react-query'

const url = 'https://geoid-dev.taktikid.com/api/vouchers'
const getVouchers = async (token) => {
    const response = await fetch(url, {
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