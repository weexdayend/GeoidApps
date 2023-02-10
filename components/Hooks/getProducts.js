import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from './HooksHelper'

const getProducts = async (id) => {
    const response = await fetch(`${BASE_URL}/categories/brands/${id}/products`, {
        method: 'GET',
    }).then((response) => response.json()).then(({data}) => {
        console.log(data)
        return data
    })
    return response
}

export const UseGetProducts = (id) => {
    const { isLoading, data, isRefetching, isFetching } = useQuery(['list-product'], () => getProducts(id))
    return { loadAsh: isLoading, data, isRefetching, isFetching }
}