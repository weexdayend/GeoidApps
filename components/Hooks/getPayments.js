import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from './HooksHelper'

const getPayments = async () => {
    const response = await fetch(`${BASE_URL}/paymentmethod`, {
        method: 'GET',
    }).then((response) => response.json()).then(({data}) => {
        return data
    })
    return response
}

export const UseGetPayments = () => {
    const { isLoading, data } = useQuery(['list-payment'], () => getPayments())
    return { loadAsh: isLoading, data }
}