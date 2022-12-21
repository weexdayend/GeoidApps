import { useQuery } from '@tanstack/react-query'

const productUrl = 'https://geoid-dev.taktikid.com/api/categories/brands/'
const getProducts = async (id) => {
    const response = await fetch(productUrl+id+'/products', {
        method: 'GET',
    }).then((response) => response.json()).then(({data}) => {
        return data
    })
    return response
}

export const UseGetProducts = (id) => {
    const { isLoading, data, isRefetching, isFetching } = useQuery(['list-product'], () => getProducts(id))
    return { loadAsh: isLoading, data, isRefetching, isFetching }
}