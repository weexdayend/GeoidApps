import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from './HooksHelper'

const getBrandCategory = async (id) => {
    const response = await fetch(`${BASE_URL}/categories/${id}/brands`, {
        method: 'GET',
    }).then((response) => response.json()).then(({data}) => {
        return data
    })
    return response
}

export const UseGetBrandCategory = (id) => {
    const { isLoading, data, isRefetching } = useQuery(['category-brand'], () => getBrandCategory(id))
    return { loadAsh: isLoading, data, isRefetching }
}